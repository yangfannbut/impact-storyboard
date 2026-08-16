<template>
  <!-- 
    Skeleton Card wrapper matching the exact dimensions and styling of the real StoryCard.
    Added border and matching rounded corners.
  -->
  <div class="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-gray-100">
    
    <!-- Image Placeholder -->
    <!-- h-48 matches the exact height of the image thumbnail in StoryCard -->
    <div class="h-48 bg-gray-200 animate-pulse"></div>

    <!-- Content Placeholder -->
    <div class="p-6 flex flex-col flex-grow">
      <header class="mb-4">
        <!-- Title Lines Placeholder -->
        <div class="h-6 bg-gray-200 rounded-md animate-pulse mb-2 w-3/4"></div>
        <div class="h-6 bg-gray-200 rounded-md animate-pulse mb-4 w-1/2"></div>
        
        <!-- Author/Date Line Placeholder -->
        <div class="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </header>
      
      <!-- Body Text Placeholder -->
      <div class="space-y-3 mb-6 mt-2 flex-grow">
        <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div class="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
      </div>
      
      <!-- Tags Placeholder -->
      <div class="flex gap-2 mt-auto">
        <div class="h-6 w-16 bg-gray-200 rounded-md animate-pulse"></div>
        <div class="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>

  </div>
</template>



<script setup>
defineProps({
  story: Object
});
</script>