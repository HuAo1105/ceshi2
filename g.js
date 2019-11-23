const res = {
    code: 0,
    data: {
        lines: '20路,301路,5路,地铁5号线,机场大巴线,107路,机场快轨',
        lineids: 'lzbd,lwes,lxid,lwic,lwdf,ldfx,loin',
        linedetails: {
            lwdf: {
                name: '机场大巴线'
            },
            lwes: {
                name: '301路'
            },
            lwic: {
                name: '地铁5号线'
            },
            ldfx: {
                name: '107路'
            },
            lzbd: {
                name: '20路'
            },
            lxid: {
                name: '5路'
            },
            loin: {
                name: '机场快轨'
            }
        }
    }
};
    function parse(data) {
        let array = [
            [],
            [],
            []
        ];
        let handleData = data.data.linedetails;
        for (const key in handleData) {
            if (handleData.hasOwnProperty(key)) {
                let item = handleData[key];
                item.preKey = key;
                if (/(\d+)路/.test(item.name)) {
                    array[0].push(hasNumberLine(item, /(\d+)路/));
                }
                else if (/地铁(\d+)号线/.test(item.name)) {
                    array[1].push(hasNumberLine(item, /地铁(\d+)号线/));
                }
                else {
                    item.sortKey = item.name.length;
                    array[2].push(item);
                }
            }
        }
        array = array.map(function(item) {
            return onSort(item);
        })
        array = array.flat();
        array = array.map(function(item) {
            let obj = {};
            obj[item.preKey] = {
                name: item.name
            };
            return obj;
        })/*  */
        return array;
        function hasNumberLine(cur, reg) {
            let nameSortKey = reg.exec(cur.name)[1];
            cur.sortKey = +nameSortKey;
            return cur;
        }
        function onSort(ary) {
            let len = ary.length;
            if (len <= 1) {
                return ary;
            }
            else {
                return ary.sort(function (a, b) {
                    return a.sortKey - b.sortKey;
                })
            }
        }
    };
    const data = parse(res);
    console.log(data);        
    
    