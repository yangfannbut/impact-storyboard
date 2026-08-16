<template>
  <div class="min-h-screen bg-gray-50 py-10 font-sans text-gray-900">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <header class="mb-12 text-center pt-8">
        <!-- text-gray-900 ensures maximum contrast for the main heading -->
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          Community Impact
        </h1>
        <!-- Darkened subtitle to text-gray-700 to meet contrast standards -->
        <p class="text-xl text-gray-700 max-w-2xl mx-auto">
          Discover the real-world stories of our volunteers, mentors, and the families we support.
        </p>
      </header>

      <!-- Impact Hero Component -->
      <ImpactHero />

      <!-- Filter Buttons Section -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <!-- 
          Key Accessibility (a11y) Feature: 
          Added focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          This creates a clear blue outline when the button is focused via keyboard (Tab key).
        -->
        <button 
          @click="loadStories('all')"
          class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          :class="activeTag === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'"
        >
          All Stories
        </button>
        <button 
          @click="loadStories('Tech Mentorship')"
          class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          :class="activeTag === 'Tech Mentorship' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'"
        >
          Tech Mentorship
        </button>
        <button 
          @click="loadStories('Family Support')"
          class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          :class="activeTag === 'Family Support' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'"
        >
          Family Support
        </button>
      </div>

      <!-- Data Display Section (Responsive Grid) -->
      <!-- 
        grid-cols-1: Single column layout for mobile devices by default 
        md:grid-cols-2: Two columns for tablet screens (>= 768px)
        lg:grid-cols-3: Three columns for desktop screens (>= 1024px)
      -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Loading State: Display 3 skeleton cards while fetching data -->
        <template v-if="isLoading">
          <SkeletonCard v-for="n in 3" :key="n" />
        </template>
        
        <!-- Loaded State: Display actual story cards -->
        <template v-else>
          <!-- Listening to the @open-lightbox event emitted from StoryCard -->
          <StoryCard 
            v-for="story in stories" 
            :key="story.id" 
            :story="story" 
            @open-lightbox="handleOpenLightbox"
          />
        </template>

      </div>

      <!-- Submission Form Component -->
      <SubmissionForm />

      <!-- The Lightbox Component (Rendered conditionally) -->
      <MediaLightbox 
        v-if="isLightboxOpen"
        :image-url="activeMedia.imageUrl"
        :alt-text="activeMedia.title"
        @close="handleCloseLightbox"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchStories } from './services/api.js';

// Import all child components
import StoryCard from './components/StoryCard.vue';
import SkeletonCard from './components/SkeletonCard.vue';
import ImpactHero from './components/ImpactHero.vue';
import SubmissionForm from './components/SubmissionForm.vue';
import MediaLightbox from './components/MediaLightbox.vue';

// State variables for stories and UI
const stories = ref([]);
const isLoading = ref(true);
const activeTag = ref('all');

// State variables for Lightbox functionality
const isLightboxOpen = ref(false);
const activeMedia = ref(null);

// Fetch and filter stories
const loadStories = async (tag) => {
  isLoading.value = true;
  activeTag.value = tag;
  try {
    stories.value = await fetchStories(tag);
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Handle opening the lightbox from a story card
const handleOpenLightbox = (story) => {
  if (story.imageUrl) {
    activeMedia.value = story;
    isLightboxOpen.value = true;
  }
};

// Handle closing the lightbox
const handleCloseLightbox = () => {
  isLightboxOpen.value = false;
  // Clear active media data after the fade-out animation finishes (approx 300ms)
  setTimeout(() => {
    activeMedia.value = null;
  }, 300);
};

// Automatically load all data on initial component mount
onMounted(() => {
  loadStories('all');
});
</script>