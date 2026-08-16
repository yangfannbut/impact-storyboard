<template>
  <article 
    tabindex="0"
    class="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <!-- Image Thumbnail Section -->
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
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-6 flex flex-col flex-grow">
      <header class="mb-4">
        <h3 class="text-xl font-bold text-gray-900 leading-tight mb-2">{{ story.title }}</h3>
        <p class="text-sm text-gray-700 font-medium">
          By <span class="text-gray-900 font-semibold">{{ story.author }}</span> 
          ({{ story.role }}) · {{ story.date }}
        </p>
      </header>
      
      <p class="text-gray-800 mb-6 flex-grow leading-relaxed">{{ story.summary }}</p>
      
      <!-- Footer: Tags & Interaction Buttons -->
      <div class="mt-auto pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in story.tags" 
            :key="tag"
            class="px-2.5 py-1 bg-blue-50 text-blue-900 text-xs font-bold rounded-md"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Like & Share Actions -->
        <div class="flex items-center gap-2">
          
          <!-- Like Button -->
          <button 
            @click="toggleLike"
            class="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'"
            :aria-label="isLiked ? 'Unlike this story' : 'Like this story'"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 transition-transform duration-200" 
              :class="isLiked ? 'fill-current scale-110' : 'fill-none'"
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{{ currentLikes }}</span>
          </button>

          <!-- Share Button with Tooltip -->
          <div class="relative">
            <button 
              @click="handleShare"
              class="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Share this story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            <!-- Copied Tooltip (Appears temporarily on click) -->
            <span 
              v-if="showTooltip" 
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap animate-fade-in"
            >
              Link Copied!
            </span>
          </div>

        </div>
      </div>

    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  story: Object
});

defineEmits(['open-lightbox']);

// --- Like Functionality ---
const isLiked = ref(false);
// If likes aren't provided in the mock JSON, simulate a random starting number between 15 and 45
const currentLikes = ref(props.story.likes || Math.floor(Math.random() * 30) + 15);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  currentLikes.value += isLiked.value ? 1 : -1;
};

// --- Share Functionality ---
const showTooltip = ref(false);

const handleShare = async () => {
  const shareData = {
    title: props.story.title,
    text: props.story.summary,
    url: window.location.href, // In a real app, this would be a specific URL for the story
  };

  // Try to use the native Web Share API (works on mobile and modern desktop browsers like Edge/Safari)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      // User cancelled or share failed, silently fall back to clipboard logic
    }
  }

  // Fallback: Copy current URL to clipboard
  navigator.clipboard.writeText(shareData.url).then(() => {
    showTooltip.value = true;
    setTimeout(() => {
      showTooltip.value = false;
    }, 2000); // Hide tooltip after 2 seconds
  });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, 5px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>