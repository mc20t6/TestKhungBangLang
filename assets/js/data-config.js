
const DATA_CONFIG = {
    // LĨNH VỰC 1: CHÍNH TRỊ
    'chinh-tri': {
        name: 'Chính trị - Xây dựng hệ thống chính trị',
        icon: 'bi-flag-fill',
        color: 'primary',
        groups: {
            'to-chuc-dang': {
                name: 'Tổ chức Đảng',
                indicators: [
                    { id: 'ct_01', name: 'Số chi bộ trực thuộc', unit: 'chi bộ', type: 'number' },
                    { id: 'ct_02', name: 'Tổng số đảng viên', unit: 'người', type: 'number' },
                    { id: 'ct_03', name: 'Đảng viên nữ', unit: 'người', type: 'number' },
                    { id: 'ct_04', name: 'Đảng viên dưới 35 tuổi', unit: 'người', type: 'number' },
                    { id: 'ct_05', name: 'Đảng viên mới kết nạp', unit: 'người', type: 'number' },
                    { id: 'ct_06', name: 'Chi bộ hoàn thành tốt nhiệm vụ', unit: 'chi bộ', type: 'number' },
                    { id: 'ct_07', name: 'Chi bộ hoàn thành xuất sắc nhiệm vụ', unit: 'chi bộ', type: 'number' }
                ]
            },
            'xay-dung-dang': {
                name: 'Công tác xây dựng Đảng',
                indicators: [
                    { id: 'ct_08', name: 'Số buổi sinh hoạt chi bộ', unit: 'buổi', type: 'number' },
                    { id: 'ct_09', name: 'Sinh hoạt chuyên đề', unit: 'buổi', type: 'number' },
                    { id: 'ct_10', name: 'Đảng viên tham gia sinh hoạt', unit: '%', type: 'percent' },
                    { id: 'ct_11', name: 'Đảng viên vi phạm kỷ luật', unit: 'người', type: 'number' },
                    { id: 'ct_12', name: 'Đảng viên bị xử lý kỷ luật', unit: 'người', type: 'number' }
                ]
            },
            'chinh-quyen': {
                name: 'Chính quyền - Cải cách hành chính',
                indicators: [
                    { id: 'ct_13', name: 'Tổng số CBCC xã', unit: 'người', type: 'number' },
                    { id: 'ct_14', name: 'CBCC đạt chuẩn theo vị trí việc làm', unit: 'người', type: 'number' },
                    { id: 'ct_15', name: 'Hồ sơ TTHC tiếp nhận trong tháng', unit: 'hồ sơ', type: 'number' },
                    { id: 'ct_16', name: 'Hồ sơ giải quyết đúng hạn', unit: '%', type: 'percent' },
                    { id: 'ct_17', name: 'Hồ sơ giải quyết trễ hạn', unit: 'hồ sơ', type: 'number' },
                    { id: 'ct_18', name: 'Số cuộc tiếp công dân', unit: 'cuộc', type: 'number' }
                ]
            },
            'mat-tran': {
                name: 'Mặt trận và các đoàn thể',
                indicators: [
                    { id: 'ct_19', name: 'Số hội viên MTTQ', unit: 'người', type: 'number' },
                    { id: 'ct_20', name: 'Hội Nông dân', unit: 'người', type: 'number' },
                    { id: 'ct_21', name: 'Hội Phụ nữ', unit: 'người', type: 'number' },
                    { id: 'ct_22', name: 'Đoàn Thanh niên', unit: 'người', type: 'number' },
                    { id: 'ct_23', name: 'Hội Cựu chiến binh', unit: 'người', type: 'number' },
                    { id: 'ct_24', name: 'Phong trào thi đua được phát động', unit: 'phong trào', type: 'number' }
                ]
            }
        }
    },

    // LĨNH VỰC 2: KINH TẾ
    'kinh-te': {
        name: 'Kinh tế',
        icon: 'bi-graph-up-arrow',
        color: 'success',
        groups: {
            'nong-lam-ngu': {
                name: 'Nông - Lâm - Ngư nghiệp',
                indicators: [
                    { id: 'kt_25', name: 'Diện tích gieo trồng', unit: 'ha', type: 'number' },
                    { id: 'kt_26', name: 'Sản lượng lương thực', unit: 'tấn', type: 'number' },
                    { id: 'kt_27', name: 'Diện tích cây trồng chủ lực', unit: 'ha', type: 'number' },
                    { id: 'kt_28', name: 'Tổng đàn gia súc', unit: 'con', type: 'number' },
                    { id: 'kt_29', name: 'Tổng đàn gia cầm', unit: 'con', type: 'number' },
                    { id: 'kt_30', name: 'Diện tích rừng tự nhiên', unit: 'ha', type: 'number' },
                    { id: 'kt_31', name: 'Diện tích rừng trồng mới', unit: 'ha', type: 'number' }
                ]
            },
            'cong-nghiep': {
                name: 'Công nghiệp - TTCN - Xây dựng',
                indicators: [
                    { id: 'kt_32', name: 'Số cơ sở sản xuất TTCN', unit: 'cơ sở', type: 'number' },
                    { id: 'kt_33', name: 'Lao động trong TTCN', unit: 'người', type: 'number' },
                    { id: 'kt_34', name: 'Công trình xây dựng trong tháng', unit: 'công trình', type: 'number' }
                ]
            },
            'thuong-mai': {
                name: 'Thương mại - Dịch vụ',
                indicators: [
                    { id: 'kt_35', name: 'Số hộ kinh doanh cá thể', unit: 'hộ', type: 'number' },
                    { id: 'kt_36', name: 'Doanh thu thương mại - dịch vụ', unit: 'triệu đồng', type: 'money' },
                    { id: 'kt_37', name: 'Chợ, điểm kinh doanh đang hoạt động', unit: 'điểm', type: 'number' }
                ]
            },
            'tai-chinh': {
                name: 'Tài chính - Ngân sách',
                indicators: [
                    { id: 'kt_38', name: 'Thu ngân sách trên địa bàn', unit: 'triệu đồng', type: 'money' },
                    { id: 'kt_39', name: 'Chi ngân sách xã', unit: 'triệu đồng', type: 'money' },
                    { id: 'kt_40', name: 'Tỷ lệ giải ngân vốn đầu tư', unit: '%', type: 'percent' }
                ]
            },
            'chuong-trinh': {
                name: 'Chương trình, Dự án',
                indicators: [
                    { id: 'kt_41', name: 'Số chương trình MTQG triển khai', unit: 'chương trình', type: 'number' },
                    { id: 'kt_42', name: 'Tỷ lệ hoàn thành kế hoạch năm', unit: '%', type: 'percent' }
                ]
            }
        }
    },

    // LĨNH VỰC 3: VĂN HÓA - XÃ HỘI
    'van-hoa-xa-hoi': {
        name: 'Văn hóa - Xã hội',
        icon: 'bi-people-fill',
        color: 'warning',
        groups: {
            'dan-so': {
                name: 'Dân số - Lao động',
                indicators: [
                    { id: 'vh_43', name: 'Dân số toàn xã', unit: 'người', type: 'number' },
                    { id: 'vh_44', name: 'Tăng/giảm dân số', unit: 'người', type: 'number' },
                    { id: 'vh_45', name: 'Lao động trong độ tuổi', unit: 'người', type: 'number' },
                    { id: 'vh_46', name: 'Lao động có việc làm', unit: 'người', type: 'number' },
                    { id: 'vh_47', name: 'Lao động đi làm ngoài địa phương', unit: 'người', type: 'number' }
                ]
            },
            'giao-duc': {
                name: 'Giáo dục - Đào tạo',
                indicators: [
                    { id: 'vh_48', name: 'Số trường học', unit: 'trường', type: 'number' },
                    { id: 'vh_49', name: 'Số lớp học', unit: 'lớp', type: 'number' },
                    { id: 'vh_50', name: 'Tổng số học sinh', unit: 'học sinh', type: 'number' },
                    { id: 'vh_51', name: 'Học sinh bỏ học', unit: 'học sinh', type: 'number' },
                    { id: 'vh_52', name: 'Trường đạt chuẩn quốc gia', unit: 'trường', type: 'number' }
                ]
            },
            'y-te': {
                name: 'Y tế - Chăm sóc sức khỏe',
                indicators: [
                    { id: 'vh_53', name: 'Số cơ sở y tế', unit: 'cơ sở', type: 'number' },
                    { id: 'vh_54', name: 'Bác sĩ, nhân viên y tế', unit: 'người', type: 'number' },
                    { id: 'vh_55', name: 'Tỷ lệ người dân tham gia BHYT', unit: '%', type: 'percent' },
                    { id: 'vh_56', name: 'Lượt khám chữa bệnh', unit: 'lượt', type: 'number' }
                ]
            },
            'van-hoa': {
                name: 'Văn hóa - Thông tin - Thể thao',
                indicators: [
                    { id: 'vh_57', name: 'Thôn/bản văn hóa', unit: 'thôn/bản', type: 'number' },
                    { id: 'vh_58', name: 'Gia đình văn hóa', unit: 'gia đình', type: 'number' },
                    { id: 'vh_59', name: 'Hoạt động văn hóa - thể thao tổ chức', unit: 'hoạt động', type: 'number' }
                ]
            },
            'an-sinh': {
                name: 'An sinh xã hội',
                indicators: [
                    { id: 'vh_60', name: 'Số hộ nghèo', unit: 'hộ', type: 'number' },
                    { id: 'vh_61', name: 'Số hộ cận nghèo', unit: 'hộ', type: 'number' },
                    { id: 'vh_62', name: 'Hộ thoát nghèo trong năm', unit: 'hộ', type: 'number' },
                    { id: 'vh_63', name: 'Đối tượng bảo trợ xã hội', unit: 'người', type: 'number' },
                    { id: 'vh_64', name: 'Nhà ở cần hỗ trợ sửa chữa', unit: 'nhà', type: 'number' }
                ]
            }
        }
    },

    // LĨNH VỰC 4: QUỐC PHÒNG - AN NINH
    'quoc-phong-an-ninh': {
        name: 'Quốc phòng - An ninh',
        icon: 'bi-shield-lock-fill',
        color: 'danger',
        groups: {
            'quoc-phong': {
                name: 'Quốc phòng',
                indicators: [
                    { id: 'qp_65', name: 'Tổng quân số dân quân tự vệ', unit: 'người', type: 'number' },
                    { id: 'qp_66', name: 'Dân quân thường trực', unit: 'người', type: 'number' },
                    { id: 'qp_67', name: 'Huấn luyện dân quân', unit: 'lượt người', type: 'number' },
                    { id: 'qp_68', name: 'Công tác tuyển quân', unit: 'text', type: 'text' },
                    { id: 'qp_69', name: 'Lực lượng dự bị động viên', unit: 'người', type: 'number' }
                ]
            },
            'an-ninh': {
                name: 'An ninh - Trật tự',
                indicators: [
                    { id: 'qp_70', name: 'Số vụ vi phạm ANTT', unit: 'vụ', type: 'number' },
                    { id: 'qp_71', name: 'Số vụ phạm pháp hình sự', unit: 'vụ', type: 'number' },
                    { id: 'qp_72', name: 'Số vụ tệ nạn xã hội', unit: 'vụ', type: 'number' },
                    { id: 'qp_73', name: 'Tai nạn giao thông', unit: 'vụ', type: 'number' },
                    { id: 'qp_74', name: 'Đối tượng quản lý tại địa bàn', unit: 'người', type: 'number' }
                ]
            },
            'phong-trao': {
                name: 'Phong trào toàn dân BVANTQ',
                indicators: [
                    { id: 'qp_75', name: 'Mô hình tự quản về ANTT', unit: 'mô hình', type: 'number' },
                    { id: 'qp_76', name: 'Tổ ANTT cơ sở', unit: 'tổ', type: 'number' },
                    { id: 'qp_77', name: 'Tin báo tố giác tội phạm', unit: 'tin', type: 'number' },
                    { id: 'qp_78', name: 'Vụ việc được giải quyết', unit: 'vụ', type: 'number' }
                ]
            }
        }
    }
};

// Danh sách đơn vị hành chính (Thôn/bản)
const DON_VI = [
    { id: 'toan-xa', name: 'Toàn xã', type: 'xa' },
    { id: 'thon-1', name: 'Thôn 1', type: 'thon' },
    { id: 'thon-2', name: 'Thôn 2', type: 'thon' },
    { id: 'thon-3', name: 'Thôn 3', type: 'thon' },
    { id: 'ban-1', name: 'Bản 1', type: 'ban' },
    { id: 'ban-2', name: 'Bản 2', type: 'ban' }
];

// Hàm tiện ích: Lấy tất cả chỉ tiêu
function getAllIndicators() {
    const all = [];
    Object.keys(DATA_CONFIG).forEach(sector => {
        Object.keys(DATA_CONFIG[sector].groups).forEach(group => {
            DATA_CONFIG[sector].groups[group].indicators.forEach(ind => {
                all.push({
                    ...ind,
                    sector: sector,
                    sectorName: DATA_CONFIG[sector].name,
                    groupName: DATA_CONFIG[sector].groups[group].name
                });
            });
        });
    });
    return all;
}

// Hàm tìm chỉ tiêu theo ID
function getIndicatorById(id) {
    const all = getAllIndicators();
    return all.find(ind => ind.id === id);
}

// Hàm tìm chỉ tiêu theo từ khóa
function searchIndicators(keyword) {
    if (!keyword) return [];
    const all = getAllIndicators();
    const k = keyword.toLowerCase();
    return all.filter(ind => 
        ind.name.toLowerCase().includes(k) || 
        ind.id.toLowerCase().includes(k) ||
        ind.groupName.toLowerCase().includes(k)
    );
}