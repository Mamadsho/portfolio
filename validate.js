function validate_h(rel_pos) {
    if (rel_pos < 0) {
        return 0;
    };
    if (rel_pos + 100 * c.offsetWidth / c.parentElement.offsetWidth > 100) {
        return 100 - 100 * c.offsetWidth / c.parentElement.offsetWidth;
    };
    return rel_pos;
};
function validate_v(rel_pos) {
    if (rel_pos < 0) {
        return 0;
    };
    if (rel_pos + 100 * c.offsetHeight / c.parentElement.offsetHeight > 100) {
        return 100 - 100 * c.offsetHeight / c.parentElement.offsetHeight;
    };
    return rel_pos;
};
