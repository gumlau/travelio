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

          <div v-if="selectedHomeUniversity && isLoading" class="mt-6">
            <p class="text-sm text-gray-500">Loading courses...</p>
          </div>

          <div v-if="selectedHomeUniversity && !isLoading && homeCourses.length > 0" class="mt-6">
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
              :disabled="!canSearch || isMatching"
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300"
            >
              <span v-if="isMatching">Matching Courses...</span>
              <span v-else>Find Matching Courses</span>
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
                    <p class="text-sm text-gray-500">{{ selectedHomeUniversity }}</p>
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
                        <p class="mt-1 text-sm text-gray-500">{{ selectedHostUniversity }}</p>
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
import { ref, computed, onMounted, watch } from 'vue'
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

// Universities (limited to MIT, NTU, KTH)
const universities = ['MIT', 'NTU', 'KTH']

// CSV course data storage
const courseDatabase = ref({
  'MIT': [],
  'NTU': [],
  'KTH': []
})

// State
const selectedHomeUniversity = ref('')
const selectedHostUniversity = ref('')
const selectedCourses = ref([])
const matchResults = ref([])
const homeQuery = ref('')
const hostQuery = ref('')
const isLoading = ref(false)
const isMatching = ref(false)

// OpenAI API key
const apiKey = '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'

// Computed Properties for Filtering Universities
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

// Filtered courses
const homeCourses = computed(() => courseDatabase.value[selectedHomeUniversity.value] || [])
const hostCourses = computed(() => courseDatabase.value[selectedHostUniversity.value] || [])

const canSearch = computed(() => 
  selectedHomeUniversity.value && 
  selectedHostUniversity.value && 
  selectedCourses.value.length > 0 &&
  !isLoading.value
)

// CSV Parsing and Loading Function
async function loadCourseData(university) {
  isLoading.value = true
  
  try {
    let csvFilePath = '';
    
    // Select the right CSV file based on university
    if (university === 'MIT') {
      csvFilePath = '/Final_MIT_Course_Data.csv';
    } else if (university === 'NTU') {
      csvFilePath = '/Final_NTU_Course_Data.csv';
    } else if (university === 'KTH') {
      csvFilePath = '/Final_KTH_Course_Data.csv';
    }
    
    // Fetch and parse CSV
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    
    // Parse CSV
    const rows = csvText.split('\n');
    const headers = rows[0].split(',');
    
    // Extract title and description from CSV
    const courses = [];
    
    for (let i = 1; i < rows.length; i++) {
      if (rows[i].trim() === '') continue;
      
      // Handle commas within quoted fields
      const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
      const matches = [...rows[i].matchAll(regex)].map(match => match[0].replace(/^"|"$/g, ''));
      
      if (matches.length >= 2) {
        const courseTitle = matches[0].trim();
        const courseDescription = matches[1].trim();
        
        // Extract course code and name
        const codeParts = courseTitle.split(' - ');
        const code = codeParts[0].trim();
        const name = codeParts.length > 1 ? codeParts[1].trim() : code;
        
        courses.push({
          code,
          name,
          description: courseDescription
        });
      }
    }
    
    // Store in the database
    courseDatabase.value[university] = courses;
  } catch (error) {
    console.error('Error loading course data:', error);
  } finally {
    isLoading.value = false;
  }
}

// Watch for university selection to load courses
watch(selectedHomeUniversity, async (newVal) => {
  if (newVal && courseDatabase.value[newVal].length === 0) {
    await loadCourseData(newVal);
  }
});

watch(selectedHostUniversity, async (newVal) => {
  if (newVal && courseDatabase.value[newVal].length === 0) {
    await loadCourseData(newVal);
  }
});

// Course matching using OpenAI
async function findMatches() {
  isMatching.value = true;
  matchResults.value = [];
  
  try {
    // For each selected course
    for (const homeCourse of selectedCourses.value) {
      // Prepare results for this course
      const courseMatches = {
        homeCourse,
        matches: [],
        matchScore: 0
      };
      
      // Get host courses to match against
      const hostUniversityCourses = courseDatabase.value[selectedHostUniversity.value];
      
      // Use OpenAI API to match courses
      const topMatches = await matchCoursesWithOpenAI(homeCourse, hostUniversityCourses);
      
      if (topMatches && topMatches.length > 0) {
        courseMatches.matches = topMatches;
        courseMatches.matchScore = Math.round(topMatches[0].similarity);
      }
      
      matchResults.value.push(courseMatches);
    }
  } catch (error) {
    console.error('Error during course matching:', error);
  } finally {
    isMatching.value = false;
  }
}

// OpenAI matching function
async function matchCoursesWithOpenAI(homeCourse, hostCourses) {
  try {
    // Prepare the prompt for OpenAI
    let prompt = `I have a course from ${selectedHomeUniversity.value} with the following details:
Course Code: ${homeCourse.code}
Course Name: ${homeCourse.name}
Course Description: ${homeCourse.description || 'Not available'}

I need to find the most similar courses from ${selectedHostUniversity.value} based on content, learning outcomes, and topics covered. Here are the potential matches:

`;

    // Add the host courses (limit to avoid token issues)
    const sampleSize = Math.min(hostCourses.length, 20);
    const sampledCourses = hostCourses.slice(0, sampleSize);
    
    sampledCourses.forEach((course, index) => {
      prompt += `Course ${index + 1}:
Code: ${course.code}
Name: ${course.name}
Description: ${course.description || 'Not available'}

`;
    });

    prompt += `For each course from ${selectedHostUniversity.value}, provide a similarity score from 0-100% based on how well it matches the ${selectedHomeUniversity.value} course in terms of content, skills taught, and learning outcomes. Return the top 3 matches in JSON format as follows:
[
  {
    "code": "course_code",
    "name": "course_name",
    "similarity": similarity_percentage_number
  },
  ...
]`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 800
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      return [];
    }
    
    // Parse the response to extract the matches
    const content = data.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      const matchesJson = JSON.parse(jsonMatch[0]);
      return matchesJson.map(match => ({
        ...match,
        // Ensure these fields exist in case OpenAI doesn't return them
        code: match.code || 'Unknown',
        name: match.name || 'Unknown',
        similarity: typeof match.similarity === 'number' ? match.similarity : parseInt(match.similarity) || 0
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return [];
  }
}

// Load courses on component mount
onMounted(async () => {
  // Preload course data for all universities
  for (const university of universities) {
    await loadCourseData(university);
  }
});

// Styling function for match scores
const getMatchClass = (similarity) => {
  if (similarity >= 80) return 'bg-green-50 text-green-700';
  if (similarity >= 60) return 'bg-yellow-50 text-yellow-700';
  return 'bg-gray-50 text-gray-700';
};
</script> 