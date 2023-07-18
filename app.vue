<template>
   <!-- TailwindCss Pro V5.15.4 -->
   <Link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css"
   />
   <!-- Google Fonts -->
   <Link rel="preconnect" href="https://fonts.googleapis.com" />
   <Link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin="anonymous"
   />
   <!-- Poppins -->
   <Link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
      rel="stylesheet"
   />
   <Body class="bg-gray-800 text-white accent-[#4FABA8]">
      <NuxtPage />
   </Body>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
