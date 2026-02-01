// =====================================================
// HỆ THỐNG TÌM KIẾM NHANH
// =====================================================

class SearchEngine {
    constructor() {
        this.initQuickSearch();
        this.initAdvancedSearch();
    }

    // ===== TÌM KIẾM NHANH (Trong header) =====
    initQuickSearch() {
        const quickSearchInput = document.getElementById('quickSearch');
        if (!quickSearchInput) return;

        let timeout;
        quickSearchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.performQuickSearch(e.target.value);
            }, 300);
        });
    }

    performQuickSearch(keyword) {
        if (!keyword || keyword.length < 2) {
            this.hideQuickResults();
            return;
        }

        // Tìm chỉ tiêu khớp
        const indicators = searchIndicators(keyword);
        
        if (indicators.length === 0) {
            this.showQuickResults([{ type: 'no-result', message: 'Không tìm thấy kết quả' }]);
            return;
        }

        // Hiển thị gợi ý
        this.showQuickResults(indicators.slice(0, 5));
    }

    showQuickResults(results) {
        let dropdown = document.getElementById('quickSearchDropdown');
        
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'quickSearchDropdown';
            dropdown.className = 'position-absolute bg-white border rounded shadow-lg';
            dropdown.style.cssText = 'top: 100%; left: 0; right: 0; max-height: 400px; overflow-y: auto; z-index: 1000; margin-top: 5px;';
            document.getElementById('quickSearch').parentElement.style.position = 'relative';
            document.getElementById('quickSearch').parentElement.appendChild(dropdown);
        }

        if (results[0]?.type === 'no-result') {
            dropdown.innerHTML = `
                <div class="p-3 text-center text-muted">
                    <i class="bi bi-search"></i> ${results[0].message}
                </div>
            `;
        } else {
            dropdown.innerHTML = results.map(ind => `
                <div class="search-result-item p-2 border-bottom" 
                     onclick="searchEngine.selectIndicator('${ind.id}')"
                     style="cursor: pointer;">
                    <div class="fw-bold small">${ind.name}</div>
                    <div class="text-muted" style="font-size: 11px;">
                        <span class="badge bg-${DATA_CONFIG[ind.sector].color} bg-opacity-10 text-${DATA_CONFIG[ind.sector].color}">
                            ${ind.sectorName}
                        </span>
                        <span class="ms-1">${ind.groupName}</span>
                    </div>
                </div>
            `).join('');
        }

        dropdown.style.display = 'block';
    }

    hideQuickResults() {
        const dropdown = document.getElementById('quickSearchDropdown');
        if (dropdown) dropdown.style.display = 'none';
    }

    selectIndicator(indicatorId) {
        this.hideQuickResults();
        // Điều hướng đến trang module tương ứng hoặc hiện chi tiết
        const indicator = getIndicatorById(indicatorId);
        if (indicator) {
            // Có thể mở modal hiện chi tiết hoặc điều hướng
            this.showIndicatorDetail(indicator);
        }
    }

    showIndicatorDetail(indicator) {
        // Lấy dữ liệu gần nhất
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        
        const data = dataManager.getData(indicator.id, 'toan-xa', currentMonth, currentYear);
        const change = dataManager.calculateChange(indicator.id, 'toan-xa', currentMonth, currentYear);
        
        const modal = `
            <div class="modal fade" id="indicatorDetailModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-${DATA_CONFIG[indicator.sector].color} text-white">
                            <h5 class="modal-title">
                                <i class="${DATA_CONFIG[indicator.sector].icon}"></i>
                                ${indicator.name}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Lĩnh vực:</strong> ${indicator.sectorName}</p>
                                    <p><strong>Nhóm chỉ tiêu:</strong> ${indicator.groupName}</p>
                                    <p><strong>Đơn vị tính:</strong> ${indicator.unit}</p>
                                </div>
                                <div class="col-md-6">
                                    <div class="card bg-light">
                                        <div class="card-body">
                                            <div class="text-muted small">Giá trị hiện tại (${currentMonth}/${currentYear})</div>
                                            <div class="h3 text-primary mb-0">
                                                ${data ? this.formatValue(data.value, indicator.type) : 'Chưa có dữ liệu'}
                                            </div>
                                            ${change && change.change !== null ? `
                                                <div class="small mt-2 ${change.change >= 0 ? 'text-success' : 'text-danger'}">
                                                    <i class="bi bi-arrow-${change.change >= 0 ? 'up' : 'down'}"></i>
                                                    ${change.change >= 0 ? '+' : ''}${change.change} (${change.percent}%)
                                                    so với tháng trước
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <button class="btn btn-sm btn-primary" onclick="searchEngine.showChart('${indicator.id}')">
                                    <i class="bi bi-graph-up"></i> Xem biểu đồ xu hướng
                                </button>
                                <a href="nhap-lieu.html?indicator=${indicator.id}" class="btn btn-sm btn-success">
                                    <i class="bi bi-pencil"></i> Nhập liệu
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Xóa modal cũ nếu có
        const oldModal = document.getElementById('indicatorDetailModal');
        if (oldModal) oldModal.remove();
        
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalInstance = new bootstrap.Modal(document.getElementById('indicatorDetailModal'));
        modalInstance.show();
    }

    formatValue(value, type) {
        if (!value && value !== 0) return '-';
        switch(type) {
            case 'percent':
                return `${value}%`;
            case 'money':
                return `${parseFloat(value).toLocaleString('vi-VN')} triệu đồng`;
            default:
                return value;
        }
    }

    // ===== TÌM KIẾM NÂNG CAO (Trong trang chủ) =====
    initAdvancedSearch() {
        const searchBtn = document.querySelector('[onclick="performSearch()"]');
        if (searchBtn) {
            searchBtn.onclick = () => this.performAdvancedSearch();
        }
    }

    performAdvancedSearch() {
        const sector = document.getElementById('searchField')?.value || '';
        const timeValue = document.getElementById('searchTime')?.value || '';
        const keyword = document.getElementById('searchKeyword')?.value || '';
        
        let month = null, year = null;
        if (timeValue) {
            [year, month] = timeValue.split('-');
        }
        
        const params = {
            sector: sector,
            month: month,
            year: year,
            keyword: keyword
        };
        
        const results = dataManager.search(params);
        this.displayAdvancedResults(results, params);
    }

    displayAdvancedResults(results, params) {
        const container = document.getElementById('searchResult');
        if (!container) return;
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="alert alert-warning">
                    <i class="bi bi-exclamation-triangle"></i>
                    Không tìm thấy dữ liệu phù hợp. Vui lòng thử lại với điều kiện khác.
                </div>
            `;
            container.classList.remove('d-none');
            return;
        }
        
        // Nhóm kết quả theo chỉ tiêu
        const grouped = {};
        results.forEach(r => {
            if (!grouped[r.indicatorId]) {
                grouped[r.indicatorId] = [];
            }
            grouped[r.indicatorId].push(r);
        });
        
        let html = `
            <div class="alert alert-success">
                <i class="bi bi-check-circle"></i>
                Tìm thấy <strong>${results.length}</strong> bản ghi dữ liệu
            </div>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Chỉ tiêu</th>
                            <th>Đơn vị hành chính</th>
                            <th>Thời gian</th>
                            <th>Giá trị</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        results.forEach(r => {
            const indicator = getIndicatorById(r.indicatorId);
            const donVi = DON_VI.find(dv => dv.id === r.donViId);
            
            html += `
                <tr>
                    <td>
                        <div class="fw-bold">${indicator?.name || r.indicatorId}</div>
                        <small class="text-muted">${indicator?.groupName || ''}</small>
                    </td>
                    <td>${donVi?.name || r.donViId}</td>
                    <td>${r.month}/${r.year}</td>
                    <td class="fw-bold text-primary">
                        ${this.formatValue(r.value, indicator?.type)}
                    </td>
                    <td><small>${r.note || '-'}</small></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
            <div class="mt-3">
                <button class="btn btn-sm btn-outline-primary" onclick="searchEngine.exportResults()">
                    <i class="bi bi-download"></i> Xuất Excel
                </button>
            </div>
        `;
        
        container.innerHTML = html;
        container.classList.remove('d-none');
    }

    showChart(indicatorId) {
        alert('Chức năng biểu đồ đang được phát triển!');
    }

    exportResults() {
        alert('Chức năng xuất Excel đang được phát triển!');
    }
}

// Khởi tạo
let searchEngine;
document.addEventListener('DOMContentLoaded', () => {
    searchEngine = new SearchEngine();
});

// Đóng dropdown khi click bên ngoài
document.addEventListener('click', (e) => {
    if (searchEngine && !e.target.closest('#quickSearch')) {
        searchEngine.hideQuickResults();
    }
});