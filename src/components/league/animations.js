export const leagueAnimation = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            when: "beforeChildren",
        }
    }
}

export const fixtureAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
}