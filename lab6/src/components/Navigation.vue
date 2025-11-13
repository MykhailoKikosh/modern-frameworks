<template>
    <!-- Use Vue brand greens for a high-contrast header: bg-emerald-600 with darker hover/active states -->
    <nav class="shadow bg-emerald-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" class="h-8"
                     alt="Vue Logo"/>
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Vue3</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-emerald-600 md:flex-row md:space-x-6 md:mt-0 md:border-0">
                    <li>
                        <RouterLink
                                activeClass="font-semibold bg-emerald-800 text-white"
                                to="/"
                                class="block py-2 px-3 rounded text-white hover:bg-emerald-700"
                                aria-current="page">Home
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                                activeClass="font-semibold bg-emerald-800 text-white"
                                class="block py-2 px-3 rounded text-white hover:bg-emerald-700"
                                to="/products"
                              >
                            Products
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                                activeClass="font-semibold bg-emerald-800 text-white"
                                class="block py-2 px-3 rounded text-white hover:bg-emerald-700"
                                to="/about"
                              >
                            About
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>
