<script lang="ts" setup>

</script>


<template>
    <button class="nav-button">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    .nav-button {
        background-color: #13151a;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 1.2rem;
        cursor: pointer;
        color: aliceblue;
        position: relative;
    }

    @property --angle{
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
    }

    .nav-button::before {
        --border-width: 3px;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: calc(0px - var(--border-width));
        left: calc(0px - var(--border-width));
        border-radius: 5px;
        z-index: -1;
        background-clip: border-box;
        padding: var(--border-width);
        box-sizing: content-box;
        /* filter: blur(10px); */
        background-image: conic-gradient(
            from var(--angle),
            #ffffff00 0%,
            blue 100%
        );
        animation: rotate-deg 3s ease-in forwards infinite;
    }

    .nav-button::after{
        content: "";
        position: absolute;
        top: 0;
        right:0;
        bottom: 0;
        left: 0;
        background-color: #211a2e;
        border-radius: 5px;
        /* filter: blur(10px); */
        z-index: -1;
    }

    @keyframes rotate-deg {
        0% {
            --angle:0deg;
        }

        100% {
            --angle:360deg;
        }
    }
</style>