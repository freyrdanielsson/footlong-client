export const f442 = {
    value: 0,
    label: '4-4-2',
    formation: {
        gk: ['gk'],
        def: ['lb','lcb','rcb','rb'],
        mid: ['lm','lcm','rcm','rm'],
        att: ['lst','rst']
    },
    team: {
        gk: {},
        lb: {},
        lcb: {},
        rcb: {},
        rb: {},
        lm: {},
        lcm: {},
        rcm: {},
        rm: {},
        lst: {},
        rst: {}
    }
}
const f433 = {
    value: 1,
    label: '4-3-3',
    formation: {
        gk: ['gk'],
        def: ['lb','lcb','rcb','rb'],
        mid: ['lcm','ccm','rcm'],
        att: ['lw','st','rw']
    },
    team: {
        gk: {},
        lb: {},
        lcb: {},
        rcb: {},
        rb: {},
        lcm: {},
        ccm: {},
        rcm: {},
        lw: {},
        st: {},
        rw: {},
    }
}
const f352 = {
    value: 2,
    label: '3-5-2',
    formation: {
        gk: ['gk'],
        def: ['lcb', 'ccb', 'rcb'],
        mid: ['lm','lcm','ccm','rcm','rm'],
        att: ['lst', 'rst']
    },
    team: {
        gk: {},
        lcb: {},
        ccb: {},
        rcb: {},
        lm: {},
        lcm: {},
        ccm: {},
        rcm: {},
        rm: {},
        lst: {},
        rst: {},
    }
}
const f532 = {
    value: 3,
    label: '5-3-2',
    formation: {
        gk: ['gk'],
        def: ['lwb','lcb','ccb','rcb','rwb'],
        mid: ['lcm','mcm','rcm'],
        att: ['lst','rst']
    },
    team: {
        gk: {},
        lwb: {},
        lcb: {},
        ccb: {},
        rcb: {},
        rwb: {},
        lcm: {},
        mcm: {},
        rcm: {},
        lst: {},
        rst: {},
    }
}
const f523 = {
    value: 4,
    label: '5-2-3',
    formation: {
        gk: ['gk'],
        def: ['lwb', 'lcb', 'ccb', 'rcb', 'rwb'],
        mid: ['lcm','rcm'],
        att: ['lw', 'st','rw']
    },
    team: {
        gk: {},
        lwb: {},
        lcb: {},
        ccb: {},
        rcb: {},
        rwb: {},
        lcm: {},
        rcm: {},
        lw: {},
        st: {},
        rw: {},
    }
}

export const formations = [f442, f433, f352, f532, f523];

export function getAllPositions(formationObj) {
    return formationObj.gk
                .concat(formationObj.def)
                .concat(formationObj.mid)
                .concat(formationObj.att);
}