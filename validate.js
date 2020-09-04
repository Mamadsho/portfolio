function valid(v,d,shift){
    if (v<0 && shift<0){return false;};
    if (v+d>100 && shift>0){return false};
    return true;
}