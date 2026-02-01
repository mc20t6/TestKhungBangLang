/**
 * main.js - JavaScript chính cho Hệ thống dữ liệu xã Bằng Lang
 * Xử lý logic tìm kiếm, tương tác UI và các chức năng chính
 */

// ====================================
// SEARCH FUNCTIONALITY
// ====================================

/**
 * Thực hiện tìm kiếm dữ liệu
 */
function performSearch() {
    const keywordInput = document.getElementById('quickSearch') || document.getElementById('searchKeyword');
    const fieldSelect = document.getElementById('searchField');
    const timeInput = document.getElementById('searchTime');
    const resultDiv = document.getElementById('searchResult');
    
    if (!keywordInput || !resultDiv) {
        console.warn('Search elements not found');
        return;
    }
    
    const keyword = keywordInput.value.trim().toLowerCase();
    const field = fieldSelect ? fieldSelect.value : '';
    const time = timeInput ? timeInput.value : '';
    
    // Nếu không có từ khóa, ẩn kết quả
    if (keyword === '') {
        resultDiv.classList.add('d-none');
        return;
    }
    
    // Tìm kiếm trong dataConfig (từ search.js)
    let results = [];
    
    if (typeof searchInConfig === 'function') {
        results = searchInConfig(keyword);
        
        // Lọc theo lĩnh vực nếu được chọn
        if (field) {
            results = results.filter(item => item.category === field);
        }
    }
    
    // Hiển thị kết quả
    displaySearchResults(results, keyword, resultDiv);
}

/**
 * Hiển thị kết quả tìm kiếm
 */
function displaySearchResults(results, keyword, resultDiv) {
    resultDiv.classList.remove('d-none');
    
    if (results.length > 0) {
        const categoryColors = {
            'chinh-tri': 'primary',
            'kinh-te': 'success',
            'van-hoa': 'warning',
            'an-ninh': 'danger'
        };
        
        const categoryNames = {
            'chinh-tri': 'Chính trị',
            'kinh-te': 'Kinh tế',
            'van-hoa': 'Văn hóa - Xã hội',
            'an-ninh': 'QP-AN'
        };
        
        let tableRows = results.map(item => `
            <tr class="animate-fade-in">
                <td>
                    <i class="bi bi-file-earmark-text text-muted me-2"></i>
                    ${item.label}
                </td>
                <td>
                    <span class="badge bg-${categoryColors[item.category]}">
                        ${categoryNames[item.category]}
                    </span>
                </td>
                <td><span class="text-muted">${item.unit}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewDetail('${item.category}', '${item.label}')">
                        <i class="bi bi-eye"></i> Xem
                    </button>
                </td>
            </tr>
        `).join('');

        resultDiv.innerHTML = `
            <div class="alert alert-success border-start border-4 border-success">
                <i class="bi bi-check-circle-fill me-2"></i>
                Tìm thấy <strong>${results.length}</strong> kết quả cho từ khóa: "<strong>${keyword}</strong>"
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-striped align-middle">
                    <thead class="table-light">
                        <tr>
                            <th><i class="bi bi-list-ul me-2"></i>Chỉ tiêu</th>
                            <th><i class="bi bi-folder me-2"></i>Lĩnh vực</th>
                            <th><i class="bi bi-rulers me-2"></i>Đơn vị</th>
                            <th><i class="bi bi-gear me-2"></i>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
            <div class="mt-3 p-3 bg-light rounded">
                <small class="text-muted">
                    <i class="bi bi-info-circle me-1"></i>
                    Dữ liệu được lọc từ các module chuyên môn trong hệ thống.
                    Nhấn "Xem" để xem chi tiết số liệu.
                </small>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="alert alert-warning border-start border-4 border-warning">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                Không tìm thấy chỉ tiêu nào khớp với từ khóa "<strong>${keyword}</strong>".
                <hr>
                <small class="text-muted">
                    <strong>Gợi ý:</strong> Thử tìm kiếm với các từ khóa như: 
                    "đảng viên", "hộ nghèo", "ngân sách", "an ninh"...
                </small>
            </div>
        `;
    }
}

/**
 * Xem chi tiết một chỉ tiêu
 */
function viewDetail(category, label) {
    const moduleUrls = {
        'chinh-tri': 'modules/chinh-tri.html',
        'kinh-te': 'modules/kinh-te.html',
        'van-hoa': 'modules/van-hoa-xa-hoi.html',
        'an-ninh': 'modules/quoc-phong-an-ninh.html'
    };
    
    const url = moduleUrls[category];
    if (url) {
        window.location.href = url;
    } else {
        alert(`Xem chi tiết: ${label}\nLĩnh vực: ${category}`);
    }
}

// ====================================
// EVENT LISTENERS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Search on Enter key
    const searchInputs = document.querySelectorAll('#quickSearch, #searchKeyword');
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                }
            });
            
            // Real-time search (optional)
            input.addEventListener('input', debounce(performSearch, 500));
        }
    });
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize animations
    initializeAnimations();
    
    // Update dashboard stats periodically
    updateDashboardStats();
    
    // Check for notifications
    checkNotifications();
});

// ====================================
// UTILITY FUNCTIONS
// ====================================

/**
 * Debounce function để giảm số lần gọi hàm
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Initialize Bootstrap tooltips
 */
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Initialize scroll animations
 */
function initializeAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Update dashboard statistics
 */
function updateDashboardStats() {
    // Simulate real-time updates (in production, fetch from API)
    const statsElements = document.querySelectorAll('.stat-value');
    
    statsElements.forEach(el => {
        // Add animation class
        el.classList.add('stat-update');
        setTimeout(() => {
            el.classList.remove('stat-update');
        }, 1000);
    });
}

/**
 * Check for system notifications
 */
function checkNotifications() {
    // In production, this would fetch from API
    const notifications = [
        // Example: { type: 'info', message: 'Có dữ liệu mới cần cập nhật' }
    ];
    
    if (notifications.length > 0) {
        showNotificationBadge(notifications.length);
    }
}

/**
 * Show notification badge
 */
function showNotificationBadge(count) {
    const badge = document.createElement('span');
    badge.className = 'badge bg-danger rounded-pill ms-2';
    badge.textContent = count;
    
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.appendChild(badge);
    }
}

/**
 * Format number with thousand separator
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Format currency (VND)
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

/**
 * Format date to Vietnamese format
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Show loading spinner
 */
function showLoading(element) {
    if (element) {
        element.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Đang tải...</span>
                </div>
                <p class="mt-2 text-muted">Đang tải dữ liệu...</p>
            </div>
        `;
    }
}

/**
 * Hide loading spinner
 */
function hideLoading(element) {
    if (element) {
        const spinner = element.querySelector('.spinner-border');
        if (spinner) {
            spinner.closest('div').remove();
        }
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove after hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

/**
 * Create toast container if not exists
 */
function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

/**
 * Confirm action with custom dialog
 */
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

/**
 * Export data to CSV
 */
function exportToCSV(data, filename = 'data.csv') {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

/**
 * Convert JSON to CSV
 */
function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr);
    
    return array.map(row => {
        return Object.values(row).map(value => {
            return typeof value === 'string' ? `"${value}"` : value;
        }).join(',');
    }).join('\n');
}

/**
 * Print current page
 */
function printPage() {
    window.print();
}

/**
 * Validate form data
 */
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

/**
 * Clear form validation
 */
function clearValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
}

// ====================================
// GLOBAL EXPORTS
// ====================================

// Make functions available globally
window.performSearch = performSearch;
window.viewDetail = viewDetail;
window.formatNumber = formatNumber;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.showToast = showToast;
window.confirmAction = confirmAction;
window.exportToCSV = exportToCSV;
window.printPage = printPage;
window.validateForm = validateForm;
window.clearValidation = clearValidation;

// Log initialization
console.log('Bằng Lang Digital System - Main JS loaded successfully');