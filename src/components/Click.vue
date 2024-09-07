<script lang="ts" setup></script>

<template>
    <div class="clock-wrapper">
        <div class="clock-second-dot">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="clock-dot">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="clock-time" data-time="var(--time)"></div>
        <div class="clock-pointer"></div>
        <div class="clock-pointer-dot"></div>
        <div class="clock-pointer-sector"></div>
    </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
.clock-wrapper {
    margin-left: 32px;
    background-color: #000;
    border-radius: 50%;
    width: 128px;
    height: 128px;
    border: 2px solid green;
    position:relative;
    margin: auto auto 0;

    @protype --angle {
        syntax: "<angle>";
        default: 0deg;
    }

    .clock-second-dot {
        @for $i from 1 to 61 {
            div:nth-child(#{$i}){
                position: absolute;
                top: 50%;
                left: 50%;
                transform-origin: bottom center;
                transform: translate(calc(-50% - 60px * math.sin($i * 6deg)), calc(-100% + 60px * math.cos($i * 6deg))) rotate($i * 6deg);
                width: 2px;
                height: 4px;
                border-radius: 1px;
                background-color: darken(yellow, 30%);

                animation: sector 1s linear math.div(($i - 30) * 1s, 60) infinite;

                @keyframes sector {
                    from {
                        background-color: blue;
                    }
                    to {
                        background-color: darken(yellow, 30%);
                    }
                }
            }
        }
    }

    .clock-pointer-sector {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-image: conic-gradient(from var(--angle),darken(rgb(0 0 255 / 0),40%), rgb(0 0 255 / 0.2));
        animation: angle 1s linear infinite;

        @keyframes angle {
            from {
                --angle: 0deg;
            }
            to {
                --angle: 360deg;
            }
        }
    }

    .clock-pointer-dot {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: blue;
        z-index: 999;
    }

    .clock-pointer {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: darken(blue, 30%);
        border-radius: 50%;
        z-index: 999;
        
        &::before {
            content: '';
            width: 4px;
            height: 48px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: 50% 75%;
            transform: translate(-50%, -75%) rotate(0deg);
            background-color: darken(blue, 20%);
            // background-image: conic-gradient(blue, darken(blue, 80%));
            border-radius: 2px 2px 2px 2px / 100% 100% 2px 2px;
            z-index: 0;
            animation: 1s rotate-second linear infinite;

            @keyframes rotate-second {
                from {
                    transform: translate(-50%, -75%) rotate(0deg);
                }
                to {
                    transform: translate(-50%, -75%) rotate(360deg);
                }
            }

        }
        &::after {
            content: '';
            width: 4px;
            height: 64px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: 50% 70%;
            transform: translate(-50%, -70%) rotate(0deg);
            background-color: darken(blue, 20%);
            border-radius: 2px 2px 2px 2px / 100% 100% 2px 2px;
            z-index: 0;
            animation: 60s rotate-minute linear infinite;

            @keyframes rotate-minute {
                from {
                    transform: translate(-50%, -70%) rotate(0deg);
                }
                to {
                    transform: translate(-50%, -70%) rotate(360deg);
                }
            }
        }
    }

    .clock-dot {
        width: 100%;
        height: 100%;
        position: relative;
        &::before {
            content: '';
            display: none;
            position: absolute;
            z-index: 1;
            border-radius: 50%;
            transform-origin: center center;
            transform: translate(3px, 3px);
            width: calc(100% - 6px);
            height: calc(100% - 6px);
            background-color: #000;
        }
        @for $i from 1 to 13 {
            div:nth-child(#{$i}){
                position: absolute;
                top: 50%;
                left: 50%;
                transform-origin: top center;
                transform: translateX(calc(-50% - 52px * math.sin($i * 30deg))) translateY(52px * math.cos($i * 30deg)) rotate($i * 30deg);
                width: 4px;
                height: 10px;
                border-radius: 2px 2px 2px 2px;
                background-color: green;
            }
            div:nth-child(#{$i}){
                animation: lighten 60s linear ($i - 6)*5s infinite;
                @keyframes lighten {
                    from {
                        background-color: blue;
                    }
                    60% {
                        background-color: green;
                    }
                    to {
                        background-color: green;
                    }
                }
            }
        }
    }
}
</style>
