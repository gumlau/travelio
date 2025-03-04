<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" class="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900">Course Matching</a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <!-- Search Section -->
      <div class="bg-white shadow sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-base font-semibold leading-6 text-gray-900">Find Matching Courses</h2>
          <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- Home University Combobox -->
            <Combobox as="div" v-model="selectedHomeUniversity" @update:modelValue="homeQuery = ''">
              <ComboboxLabel class="block text-sm font-medium text-gray-700">Home University</ComboboxLabel>
              <div class="relative mt-2">
                <ComboboxInput 
                  class="block w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  @change="homeQuery = $event.target.value" 
                  :display-value="(uni) => uni"
                  placeholder="Search university..."
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>

                <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <ComboboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ComboboxOption 
                      v-for="university in filteredHomeUniversities" 
                      :key="university" 
                      :value="university" 
                      as="template" 
                      v-slot="{ active, selected }"
                    >
                      <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                        <span :class="['block truncate', selected && 'font-semibold']">{{ university }}</span>
                        <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </TransitionRoot>
              </div>
            </Combobox>

            <!-- Host University Combobox -->
            <Combobox as="div" v-model="selectedHostUniversity" @update:modelValue="hostQuery = ''">
              <ComboboxLabel class="block text-sm font-medium text-gray-700">Host University</ComboboxLabel>
              <div class="relative mt-2">
                <ComboboxInput 
                  class="block w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  @change="hostQuery = $event.target.value" 
                  :display-value="(uni) => uni"
                  placeholder="Search university..."
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>

                <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <ComboboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ComboboxOption 
                      v-for="university in filteredHostUniversities" 
                      :key="university" 
                      :value="university" 
                      as="template" 
                      v-slot="{ active, selected }"
                    >
                      <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                        <span :class="['block truncate', selected && 'font-semibold']">{{ university }}</span>
                        <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </TransitionRoot>
              </div>
            </Combobox>
          </div>

          <div v-if="selectedHomeUniversity" class="mt-6">
            <label class="block text-sm font-medium text-gray-700">Select Your Courses</label>
            <div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div v-for="course in homeCourses" :key="course.code" class="relative flex items-start">
                <div class="flex h-6 items-center">
                  <input
                    :id="course.code"
                    v-model="selectedCourses"
                    :value="course"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div class="ml-3 text-sm leading-6">
                  <label :for="course.code" class="font-medium text-gray-900">{{ course.code }}</label>
                  <p class="text-gray-500">{{ course.name }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <button
              @click="findMatches"
              :disabled="!canSearch"
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300"
            >
              Find Matching Courses
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="matchResults.length > 0" class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-base font-semibold leading-6 text-gray-900">Matching Results</h2>
          <div class="mt-4 space-y-6">
            <div v-for="(result, index) in matchResults" :key="index" class="border-t border-gray-200 pt-4">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">{{ result.homeCourse.code }}: {{ result.homeCourse.name }}</h3>
                  <div class="mt-1">
                    <p class="text-sm text-gray-500">Credits: {{ result.homeCourse.credits }}</p>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {{ result.matchScore }}% Match
                  </span>
                </div>
              </div>
              <div class="mt-4">
                <h4 class="text-sm font-medium text-gray-900">Matching Courses:</h4>
                <ul class="mt-2 divide-y divide-gray-200">
                  <li v-for="match in result.matches" :key="match.code" class="py-2">
                    <div class="flex items-start justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ match.code }}: {{ match.name }}</p>
                        <p class="mt-1 text-sm text-gray-500">Credits: {{ match.credits }}</p>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium" :class="getMatchClass(match.similarity)">
                          {{ match.similarity }}% Similar
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'

// Mock Universities
const universities = [
  'University of Sydney',
  'National University of Singapore',
  'University of California, Berkeley',
  'University of Tokyo',
  'University of Hong Kong'
]

// Mock Course Data
const courseDatabase = {
  'University of Sydney': [
    { code: 'COMP2022', name: 'Models of Computation', credits: 6, description: 'Introduction to theoretical computer science' },
    { code: 'INFO2222', name: 'Computing Technology', credits: 6, description: 'Understanding computing systems' },
    { code: 'DATA2002', name: 'Data Analytics', credits: 6, description: 'Introduction to data science and analytics' },
    { code: 'MATH2069', name: 'Discrete Mathematics', credits: 6, description: 'Mathematical structures in computing' }
  ],
  'National University of Singapore': [
    { code: 'CS2040', name: 'Data Structures and Algorithms', credits: 4, description: 'Fundamental algorithms and data structures' },
    { code: 'CS2103T', name: 'Software Engineering', credits: 4, description: 'Software development principles' },
    { code: 'CS2102', name: 'Database Systems', credits: 4, description: 'Database design and implementation' },
    { code: 'MA2213', name: 'Discrete Mathematics', credits: 4, description: 'Discrete structures and methods' }
  ],
  'University of California, Berkeley': [
    { code: 'CS61A', name: 'Structure and Interpretation', credits: 4, description: 'Programming concepts and techniques' },
    { code: 'CS61B', name: 'Data Structures', credits: 4, description: 'Fundamental data structures' },
    { code: 'CS70', name: 'Discrete Mathematics', credits: 4, description: 'Mathematical foundations of computer science' },
    { code: 'DATA100', name: 'Principles of Data Science', credits: 4, description: 'Introduction to data analysis' }
  ]
}

// Updated State
const selectedHomeUniversity = ref('')
const selectedHostUniversity = ref('')
const selectedCourses = ref([])
const matchResults = ref([])
const homeQuery = ref('')
const hostQuery = ref('')

// New Computed Properties for Filtering Universities
const filteredHomeUniversities = computed(() =>
  homeQuery.value === ''
    ? universities
    : universities.filter((uni) =>
        uni.toLowerCase().includes(homeQuery.value.toLowerCase())
      )
)

const filteredHostUniversities = computed(() =>
  hostQuery.value === ''
    ? universities
    : universities.filter((uni) =>
        uni.toLowerCase().includes(hostQuery.value.toLowerCase())
      )
)

// Rest of the script stays the same
const homeCourses = computed(() => courseDatabase[selectedHomeUniversity.value] || [])
const hostCourses = computed(() => courseDatabase[selectedHostUniversity.value] || [])

const canSearch = computed(() => 
  selectedHomeUniversity.value && 
  selectedHostUniversity.value && 
  selectedCourses.value.length > 0
)

// Methods
const findMatches = () => {
  matchResults.value = selectedCourses.value.map(course => {
    const matches = hostCourses.value
      .map(hostCourse => ({
        ...hostCourse,
        similarity: calculateSimilarity(course, hostCourse)
      }))
      .filter(match => match.similarity >= 60)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)

    return {
      homeCourse: course,
      matches,
      matchScore: matches.length > 0 ? Math.round(matches[0].similarity) : 0
    }
  })
}

const calculateSimilarity = (course1, course2) => {
  // Simulate course matching algorithm
  // In a real application, this would use NLP and more sophisticated matching
  let similarity = 0

  // Match based on course name
  if (course1.name.toLowerCase() === course2.name.toLowerCase()) {
    similarity += 50
  } else if (course1.name.toLowerCase().includes(course2.name.toLowerCase()) ||
             course2.name.toLowerCase().includes(course1.name.toLowerCase())) {
    similarity += 30
  }

  // Match based on credits
  if (course1.credits === course2.credits) {
    similarity += 30
  } else {
    similarity += 20 * (1 - Math.abs(course1.credits - course2.credits) / Math.max(course1.credits, course2.credits))
  }

  // Add some randomness to simulate other factors
  similarity += Math.random() * 20

  return Math.min(Math.round(similarity), 100)
}

const getMatchClass = (similarity) => {
  if (similarity >= 80) return 'bg-green-50 text-green-700'
  if (similarity >= 70) return 'bg-yellow-50 text-yellow-700'
  return 'bg-gray-50 text-gray-700'
}
</script> 