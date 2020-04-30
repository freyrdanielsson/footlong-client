const f442 = {
    label: '4-4-2',
    formation: {
        gk: ['gk'],
        def: ['lb','lcb','rcb','rb'],
        mid: ['lm','lcm','rcm','rm'],
        att: ['lst','rst']
    },
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
const f433 = {
    label: '4-3-3',
    formation: {
        gk: ['gk'],
        def: ['lb','lcb','rcb','rb'],
        mid: ['lcm','ccm','rcm'],
        att: ['lw','st','rw']
    },
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
const f352 = {
    label: '3-5-2',
    formation: {
        gk: ['gk'],
        def: ['lcb', 'ccb', 'rcb'],
        mid: ['lm','lcm','ccm','rcm','rm'],
        att: ['lst', 'rst']
    },
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
const f532 = {
    label: '5-3-2',
    formation: {
        gk: ['gk'],
        def: ['lwb','lcb','ccb','rcb','rwb'],
        mid: ['lcm','mcm','rcm'],
        att: ['lst','rst']
    },
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
const f523 = {
    label: '5-2-3',
    formation: {
        gk: ['gk'],
        def: ['lwb', 'lcb', 'ccb', 'rcb', 'rwb'],
        mid: ['lcm','rcm'],
        att: ['lw', 'st','rw']
    },
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

export const formations = [f442, f433, f352, f532, f523];
