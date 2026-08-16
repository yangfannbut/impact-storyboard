<template>
  <!-- 
    tabindex="0" allows this entire card element to receive keyboard focus.
    focus:ring-2 provides a visible focus indicator for keyboard navigation users.
  -->
  <article 
    tabindex="0"
    class="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <!-- Image Thumbnail Section (Acts as a button to trigger the lightbox) -->
    <div 
      v-if="story.imageUrl"
      @click="$emit('open-lightbox', story)"
      class="h-48 overflow-hidden bg-gray-200 cursor-pointer relative group"
      role="button"
      aria-label="View larger image"
    >
      <img 
        :src="story.imageUrl" 
        :alt="story.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Subtle hover overlay with a magnifying glass icon indicator -->
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-6 flex flex-col flex-grow">
      <header class="mb-4">
        <!-- Title uses the darkest text-gray-900 for maximum readability -->
        <h3 class="text-xl font-bold text-gray-900 leading-tight mb-2">{{ story.title }}</h3>
        
        <!-- Using text-gray-700 with font-medium instead of lighter grays to meet high contrast standards (WCAG) -->
        <p class="text-sm text-gray-700 font-medium">
          By <span class="text-gray-900 font-semibold">{{ story.author }}</span> 
          ({{ story.role }}) · {{ story.date }}
        </p>
      </header>
      
      <!-- Body text uses text-gray-800 to ensure clear readability against the white background -->
      <p class="text-gray-800 mb-6 flex-grow leading-relaxed">{{ story.summary }}</p>
      
      <!-- Tags Section -->
      <div class="flex flex-wrap gap-2 mt-auto">
        <span 
          v-for="tag in story.tags" 
          :key="tag"
          class="px-2.5 py-1 bg-blue-50 text-blue-900 text-xs font-bold rounded-md"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
// Define props to receive story data from the parent component
defineProps({
  story: Object
});

// Explicitly declare the event we are emitting to the parent for the lightbox
defineEmits(['open-lightbox']);
</script>