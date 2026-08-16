<template>
  <!-- Teleport ensures the modal is rendered right before </body> to prevent z-index issues -->
  <Teleport to="body">
    <!-- Overlay Background -->
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity duration-300"
      @click.self="$emit('close')"
    >
      <!-- Close Button -->
      <button 
        @click="$emit('close')"
        class="absolute top-6 right-6 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 transition-colors z-50"
        aria-label="Close fullscreen view"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Fullscreen Image -->
      <img 
        :src="imageUrl" 
        :alt="altText" 
        class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in"
      />
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    default: 'Enlarged media view'
  }
});

const emit = defineEmits(['close']);

// Handle ESC key press to close the lightbox
const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};

// Lifecycle hooks to manage background scrolling and keyboard events
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'hidden'; // Lock background scrolling
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = ''; // Restore background scrolling
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>