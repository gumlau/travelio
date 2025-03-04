<template>
  <div class="mx-auto max-w-2xl text-center">
    <div class="bg-white shadow-sm sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-xl font-semibold text-gray-900">Get Early Access</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500 mx-auto">
          <p>Sign up to be among the first to try our AI-powered course matching platform.</p>
        </div>
        <form 
          action="https://formspree.io/f/movjgbzq"
          method="POST"
          class="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" 
          @submit.prevent="handleSubmit"
        >
          <div class="w-full sm:max-w-xs">
            <input 
              v-model="email" 
              type="email" 
              name="email" 
              id="email" 
              aria-label="Email" 
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
              placeholder="you@example.com" 
              required
            />
          </div>
          <button 
            type="submit" 
            class="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Submitting...' : 'Get Access' }}
          </button>
        </form>
        <div v-if="successMessage" class="mt-3 text-sm text-green-600">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="mt-3 text-sm text-red-600">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async (e) => {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const form = e.target
    const formData = new FormData(form)
    
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })

    if (response.ok) {
      successMessage.value = 'Thank you for signing up! We will contact you soon.'
      email.value = ''
    } else {
      const data = await response.json()
      throw new Error(data.error || 'Something went wrong')
    }
  } catch (error) {
    errorMessage.value = error.message || 'Something went wrong. Please try again.'
    console.error('Submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script> 