

function MArea(){

}

MArea.prototype._findSlot = function(vertexes){
    let slot = -100000;
    const _getLimit = (p) => {
        const s_p = `${p}`
        const r = s_p.split('.');
        if (r.length == 2) {
            return r[1].length
        }
        return 0
    }
    vertexes.forEach(p => {
        const s1 =  _getLimit(p.x)
        const s2 = _getLimit(p.y)
        if (slot < s1) slot = s1;
        if (slot < s2) slot = s2;
    });
    return {slot: parseFloat((1.0 / Math.pow(10, slot)).toFixed(slot)), limit: slot}
}

MArea.prototype.det = function(vertexes){
    const {slot, limit} = this._findSlot(vertexes);
    let add = 0.0;
    let minus = 0.0;
    for(let i = 0; i < vertexes.length; i++) {
        let next = i + 1;
        if (next == vertexes.length) next = 0;
        add += vertexes[i].x * vertexes[next].y;
    }

    for(let i = 0; i < vertexes.length; i++) {
        let next = i + 1;
        if (next == vertexes.length) next = 0;
        minus += vertexes[next].x * vertexes[i].y;
    } 
    return parseFloat((Math.abs(add - minus) / 2).toFixed(limit));
}


// method define
MArea.prototype._getBoundingX = function(vertexes){
    const xs = vertexes.map(v => v.x);
    const max = xs.findOfMax();
    const min = xs.findOfMin();
    return [min, max]
}

MArea.prototype.__makeLines = function(vertexes) {
    const lines = []
    vertexes.forEach((v, i) => {
        if (i < (vertexes.length - 1)) {  
            lines.push({v1: v, v2: vertexes[i + 1]});
        }
    })
    return lines;
}

MArea.prototype._getYOfX = function(poly, x){
    const finds = poly.filter(l => {
        if ((l.v1.x <= x) && (l.v2.x >= x)) return true;
        if ((l.v2.x <= x) && (l.v1.x >= x)) return true;
        return false;
    })
    if (finds.length == 0) return null;
    const line = finds[0];
    const m = (line.v1.y - line.v2.y) / (line.v1.x - line.v2.x);
    const b =  line.v1.y - m * line.v1.x;
    return m * x + b
}

MArea.prototype.integral = function(ref1, ref2){
    const [min1, max1] = this._getBoundingX(ref1)
    const [min2, max2] = this._getBoundingX(ref2)
    const poly1 = this.__makeLines(ref1);
    const poly2 = this.__makeLines(ref2);
    const {slot: s1, limit: limit1} = this._findSlot(ref1);
    const {slot: s2, limit: limit2} = this._findSlot(ref2);
    const slot = s1 > s2 ? s2 : s1;
    const limit = limit1 > limit2 ? limit1 : limit2
    poly2.push({v1: ref1[0], v2: ref2[0]});//頭
    poly2.push({v1: ref1[ref1.length - 1], v2: ref2[ref2.length - 1]});// 尾
    // cal
    let area = 0.0;
    for(let i = (min1 > min2 ? min2 : min1); i < (max1 >  max2 ? max1 : max2); i += slot){
        const p = parseFloat(i.toFixed(4))
        const y1 = this._getYOfX(poly1, p);
        const y2 = this._getYOfX(poly2, p);
        if ((y1 != null) && (y2 != null)){
            area += Math.abs(Math.abs(y1) - Math.abs(y2)) * slot;
        }
    }
    return parseFloat(area.toFixed(limit));
}

module.exports = MArea; 