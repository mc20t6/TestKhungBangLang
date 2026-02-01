// =====================================================
// HỆ THỐNG QUẢN LÝ DỮ LIỆU - MÔ HÌNH "XƯƠNG SỐNG"
// Mỗi bản ghi gồm 5 yếu tố: Lĩnh vực, Chỉ tiêu, Đơn vị, Thời gian, Giá trị
// =====================================================

class DataManager {
    constructor() {
        this.storageKey = 'bang_lang_data';
        this.historyKey = 'bang_lang_history';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.historyKey)) {
            localStorage.setItem(this.historyKey, JSON.stringify([]));
        }
    }

    // ===== LƯU DỮ LIỆU =====
    // Cấu trúc: { indicatorId, donViId, month, year, value, note, createdAt, updatedAt }
    saveData(indicatorId, donViId, month, year, value, note = '') {
        const data = this.getAllData();
        const existing = data.findIndex(d => 
            d.indicatorId === indicatorId && 
            d.donViId === donViId && 
            d.month === parseInt(month) && 
            d.year === parseInt(year)
        );

        const now = new Date().toISOString();
        const record = {
            indicatorId,
            donViId,
            month: parseInt(month),
            year: parseInt(year),
            value,
            note,
            updatedAt: now
        };

        if (existing >= 0) {
            // Lưu lịch sử trước khi cập nhật
            this.saveHistory(data[existing], value);
            record.createdAt = data[existing].createdAt;
            data[existing] = record;
        } else {
            record.createdAt = now;
            data.push(record);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(data));
        return record;
    }

    // ===== LƯU LỊCH SỬ THAY ĐỔI =====
    saveHistory(oldRecord, newValue) {
        const history = JSON.parse(localStorage.getItem(this.historyKey));
        history.push({
            indicatorId: oldRecord.indicatorId,
            donViId: oldRecord.donViId,
            month: oldRecord.month,
            year: oldRecord.year,
            oldValue: oldRecord.value,
            newValue: newValue,
            changedAt: new Date().toISOString()
        });
        localStorage.setItem(this.historyKey, JSON.stringify(history));
    }

    // ===== LẤY DỮ LIỆU =====
    getAllData() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    // Lấy dữ liệu theo chỉ tiêu, đơn vị, thời gian
    getData(indicatorId, donViId, month, year) {
        const data = this.getAllData();
        return data.find(d => 
            d.indicatorId === indicatorId && 
            d.donViId === donViId && 
            d.month === parseInt(month) && 
            d.year === parseInt(year)
        );
    }

    // Lấy dữ liệu theo tháng (tất cả chỉ tiêu)
    getDataByMonth(month, year, donViId = null) {
        const data = this.getAllData();
        return data.filter(d => {
            const matchTime = d.month === parseInt(month) && d.year === parseInt(year);
            if (donViId) {
                return matchTime && d.donViId === donViId;
            }
            return matchTime;
        });
    }

    // Lấy dữ liệu theo chỉ tiêu (nhiều tháng)
    getDataByIndicator(indicatorId, donViId = null, fromMonth = null, toMonth = null) {
        const data = this.getAllData();
        let filtered = data.filter(d => d.indicatorId === indicatorId);
        
        if (donViId) {
            filtered = filtered.filter(d => d.donViId === donViId);
        }
        
        if (fromMonth && toMonth) {
            filtered = filtered.filter(d => {
                const recordDate = new Date(d.year, d.month - 1);
                const from = new Date(fromMonth.year, fromMonth.month - 1);
                const to = new Date(toMonth.year, toMonth.month - 1);
                return recordDate >= from && recordDate <= to;
            });
        }
        
        // Sắp xếp theo thời gian
        return filtered.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
        });
    }

    // ===== TÌM KIẾM NHANH =====
    search(params) {
        let results = this.getAllData();
        
        // Lọc theo lĩnh vực
        if (params.sector) {
            const indicators = getAllIndicators().filter(ind => ind.sector === params.sector);
            const ids = indicators.map(ind => ind.id);
            results = results.filter(d => ids.includes(d.indicatorId));
        }
        
        // Lọc theo từ khóa chỉ tiêu
        if (params.keyword) {
            const matchedIndicators = searchIndicators(params.keyword);
            const ids = matchedIndicators.map(ind => ind.id);
            results = results.filter(d => ids.includes(d.indicatorId));
        }
        
        // Lọc theo đơn vị
        if (params.donViId) {
            results = results.filter(d => d.donViId === params.donViId);
        }
        
        // Lọc theo thời gian
        if (params.month && params.year) {
            results = results.filter(d => 
                d.month === parseInt(params.month) && 
                d.year === parseInt(params.year)
            );
        } else if (params.year) {
            results = results.filter(d => d.year === parseInt(params.year));
        }
        
        return results;
    }

    // ===== KẾ THỪA DỮ LIỆU THÁNG TRƯỚC =====
    inheritFromPreviousMonth(currentMonth, currentYear) {
        const prevDate = this.getPreviousMonth(currentMonth, currentYear);
        const prevData = this.getDataByMonth(prevDate.month, prevDate.year);
        
        const inherited = [];
        prevData.forEach(record => {
            // Kiểm tra xem tháng hiện tại đã có dữ liệu chưa
            const exists = this.getData(
                record.indicatorId, 
                record.donViId, 
                currentMonth, 
                currentYear
            );
            
            if (!exists) {
                const newRecord = this.saveData(
                    record.indicatorId,
                    record.donViId,
                    currentMonth,
                    currentYear,
                    record.value,
                    `Kế thừa từ ${prevDate.month}/${prevDate.year}`
                );
                inherited.push(newRecord);
            }
        });
        
        return inherited;
    }

    getPreviousMonth(month, year) {
        month = parseInt(month);
        year = parseInt(year);
        if (month === 1) {
            return { month: 12, year: year - 1 };
        }
        return { month: month - 1, year };
    }

    // ===== TÍNH TOÁN & THỐNG KÊ =====
    calculateChange(indicatorId, donViId, month, year) {
        const current = this.getData(indicatorId, donViId, month, year);
        if (!current) return null;
        
        const prevDate = this.getPreviousMonth(month, year);
        const previous = this.getData(indicatorId, donViId, prevDate.month, prevDate.year);
        
        if (!previous) return { current: current.value, change: null };
        
        const change = parseFloat(current.value) - parseFloat(previous.value);
        const percent = (change / parseFloat(previous.value)) * 100;
        
        return {
            current: parseFloat(current.value),
            previous: parseFloat(previous.value),
            change: change,
            percent: percent.toFixed(2)
        };
    }

    // Tính tổng theo lĩnh vực/nhóm
    getSum(indicatorId, month, year) {
        const data = this.getAllData().filter(d => 
            d.indicatorId === indicatorId && 
            d.month === parseInt(month) && 
            d.year === parseInt(year)
        );
        
        return data.reduce((sum, d) => sum + parseFloat(d.value || 0), 0);
    }

    // ===== XÓA DỮ LIỆU =====
    deleteData(indicatorId, donViId, month, year) {
        const data = this.getAllData();
        const filtered = data.filter(d => !(
            d.indicatorId === indicatorId && 
            d.donViId === donViId && 
            d.month === parseInt(month) && 
            d.year === parseInt(year)
        ));
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    }

    // ===== DỮ LIỆU MẪU =====
    loadSampleData() {
        // Tạo dữ liệu mẫu cho tháng 1 và 2 năm 2026
        const sampleData = [
            // Chính trị
            { id: 'ct_01', donVi: 'toan-xa', m: 1, y: 2026, v: 8 },
            { id: 'ct_02', donVi: 'toan-xa', m: 1, y: 2026, v: 125 },
            { id: 'ct_03', donVi: 'toan-xa', m: 1, y: 2026, v: 35 },
            
            // Kinh tế
            { id: 'kt_25', donVi: 'toan-xa', m: 1, y: 2026, v: 450 },
            { id: 'kt_26', donVi: 'toan-xa', m: 1, y: 2026, v: 1250 },
            { id: 'kt_38', donVi: 'toan-xa', m: 1, y: 2026, v: 850 },
            
            // Văn hóa - Xã hội
            { id: 'vh_43', donVi: 'toan-xa', m: 1, y: 2026, v: 4520 },
            { id: 'vh_48', donVi: 'toan-xa', m: 1, y: 2026, v: 3 },
            { id: 'vh_50', donVi: 'toan-xa', m: 1, y: 2026, v: 680 },
            { id: 'vh_60', donVi: 'toan-xa', m: 1, y: 2026, v: 125 },
            { id: 'vh_61', donVi: 'toan-xa', m: 1, y: 2026, v: 45 },
            
            // Quốc phòng - An ninh
            { id: 'qp_65', donVi: 'toan-xa', m: 1, y: 2026, v: 85 },
            { id: 'qp_70', donVi: 'toan-xa', m: 1, y: 2026, v: 3 },
            
            // Tháng 2
            { id: 'vh_43', donVi: 'toan-xa', m: 2, y: 2026, v: 4523 },
            { id: 'vh_60', donVi: 'toan-xa', m: 2, y: 2026, v: 123 },
            { id: 'kt_38', donVi: 'toan-xa', m: 2, y: 2026, v: 920 },
        ];
        
        sampleData.forEach(s => {
            this.saveData(s.id, s.donVi, s.m, s.y, s.v, 'Dữ liệu mẫu');
        });
        
        console.log('Đã tải dữ liệu mẫu!');
    }

    // ===== XUẤT/NHẬP DỮ LIỆU =====
    exportToJSON() {
        const data = {
            data: this.getAllData(),
            history: JSON.parse(localStorage.getItem(this.historyKey)),
            exportedAt: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    }

    importFromJSON(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            if (imported.data) {
                localStorage.setItem(this.storageKey, JSON.stringify(imported.data));
            }
            if (imported.history) {
                localStorage.setItem(this.historyKey, JSON.stringify(imported.history));
            }
            return true;
        } catch (e) {
            console.error('Lỗi import:', e);
            return false;
        }
    }

    clearAll() {
        if (confirm('Bạn có chắc chắn muốn xóa TẤT CẢ dữ liệu?')) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
            localStorage.setItem(this.historyKey, JSON.stringify([]));
            return true;
        }
        return false;
    }
}

// Khởi tạo instance toàn cục
const dataManager = new DataManager();