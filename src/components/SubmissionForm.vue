<template>
  <section class="mt-20 bg-white rounded-2xl shadow-md p-8 md:p-12 border border-gray-100">
    <div class="max-w-2xl mx-auto text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Share Your Story</h2>
      <p class="text-gray-600 mt-2">Have you participated in our programs? We would love to hear about your experience.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input type="text" id="name" required
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" id="email" required
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition" />
        </div>
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
        <textarea id="message" rows="4" required
          class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
      </div>

      <button type="submit" 
        class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {{ isSubmitting ? 'Submitting...' : 'Submit Story' }}
      </button>
      
      <p v-if="successMessage" class="text-green-600 text-sm text-center mt-4 font-medium">
        {{ successMessage }}
      </p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const isSubmitting = ref(false);
const successMessage = ref('');

const handleSubmit = async () => {
  isSubmitting.value = true;
  successMessage.value = '';
  
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  isSubmitting.value = false;
  successMessage.value = 'Thank you! Your story has been submitted successfully.';
};
</script>