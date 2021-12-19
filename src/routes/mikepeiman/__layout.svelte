<main class="homepage bg-black flex flex-col justify-items-center items-center">
    <slot />
</main>

<style lang="scss">
body {
    min-width: 15rem;
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    background: black;
}

#app-layout {
    background: black;
}

.homepage {
    max-width: 100vw;
}
</style>