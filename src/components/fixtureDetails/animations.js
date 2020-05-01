export const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
}

export const transition = {
    x: {
        type: "spring",
        stiffness: 200,
        damping: 200
    },
    opacity: { duration: 0.2 }
}