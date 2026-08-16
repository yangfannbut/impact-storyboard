<template>
  <header class="py-5 flex flex-wrap justify-between items-center border-b border-gray-200 mb-8">
    <!-- Brand / Logo Area -->
    <div class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <span class="text-xl font-extrabold text-gray-900 tracking-tight">Impact<span class="text-blue-600">Foundation</span></span>
    </div>
    
    <!-- Accessibility: Text Size Toggle -->
    <!-- 
      Key Accessibility (a11y) Feature:
      Allows users with visual impairments to easily scale up the entire UI.
      Uses aria-label to ensure screen readers announce the button's purpose correctly.
    -->
    <button 
      @click="toggleFontSize"
      class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      :aria-label="isLargeFont ? 'Decrease text size to standard' : 'Increase text size for readability'"
      title="Toggle Text Size"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" v-if="!isLargeFont" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" v-else />
      </svg>
      <span class="text-sm">{{ isLargeFont ? 'Standard Text' : 'Large Text' }}</span>
    </button>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLargeFont = ref(false);

const toggleFontSize = () => {
  isLargeFont.value = !isLargeFont.value;
  
  // Modifying the root html font-size. 
  // Since Tailwind relies on 'rem' units, this smoothly scales the entire interface (text, padding, margins).
  if (isLargeFont.value) {
    document.documentElement.style.fontSize = '112.5%'; // Scales up by ~12.5%
  } else {
    document.documentElement.style.fontSize = '100%'; // Standard size
  }
};

// Ensure standard size on initial mount
onMounted(() => {
  document.documentElement.style.fontSize = '100%';
});
</script>