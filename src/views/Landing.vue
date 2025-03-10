<template>
  <div class="bg-white">
    <!-- Header -->
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Travelio</span>
            <img class="h-8 w-auto" src="https://tailwindui.starxg.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm/6 font-semibold text-gray-900">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#signup" class="text-sm/6 font-semibold text-indigo-600">Get Early Access</a>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <main class="isolate">
      <!-- Hero section -->
      <div class="relative pt-14">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
        <div class="py-24 sm:py-32 lg:pb-40">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
              <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">{{ heroTitle }}</h1>
              <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">{{ heroDescription }}</p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <a href="#signup" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get Started</a>
                <a href="#features" class="text-sm/6 font-semibold text-gray-900">Learn more <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div class="mt-16 flow-root sm:mt-24">
              <div class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <video
                  v-if="videoUrl"
                  class="rounded-md shadow-2xl ring-1 ring-gray-900/10 w-full"
                  autoplay
                  loop
                  muted
                  playsinline
                  @error="(e) => console.error('Video error:', e)"
                >
                  <source :src="videoUrl" type="video/mp4">
                  <source :src="videoUrl" type="video/quicktime">
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
      </div>

      <!-- Feature section -->
      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base/7 font-semibold text-indigo-600">Career Intelligence Platform</h2>
          <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">{{ featureTitle }}</p>
          <p class="mt-6 text-pretty text-lg/8 text-gray-600">{{ featureDescription }}</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div v-for="feature in features" :key="feature.name" class="relative pl-16">
              <dt class="text-base/7 font-semibold text-gray-900">
                <div class="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <component :is="feature.icon" class="size-6 text-white" aria-hidden="true" />
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-2 text-base/7 text-gray-600">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Testimonial section -->
      <div class="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
        <div class="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
          <img class="absolute inset-0 size-full object-cover brightness-150 saturate-0" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80" alt="" />
          <div class="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
          <div class="absolute -left-80 -top-56 transform-gpu blur-3xl" aria-hidden="true">
            <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
          </div>
          <div class="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl" aria-hidden="true">
            <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
          </div>
          <div class="relative mx-auto max-w-2xl lg:mx-0">
            <figure>
              <blockquote class="mt-6 text-lg font-semibold text-white sm:text-xl/8">
                <p>"EduAdvisor has completely transformed my academic journey. The personalized guidance and resources helped me achieve my goals and excel in my studies."</p>
              </blockquote>
              <figcaption class="mt-6 text-base text-white">
                <div class="font-semibold">Sarah Chen</div>
                <div class="mt-1">Graduate Student, Stanford University</div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <!-- Pricing section -->
      <div class="py-24 sm:pt-48">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl lg:text-center">
            <h2 class="text-base/7 font-semibold text-indigo-600">Flexible Pricing</h2>
            <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">Choose your perfect plan</p>
            <p class="mt-6 text-pretty text-lg/8 text-gray-600">Start with a single session or invest in lifetime access. Select the plan that best fits your needs.</p>
          </div>
          <div class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div v-for="(tier, tierIdx) in tiers" :key="tier.id" :class="[tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8', tierIdx === 0 ? 'lg:rounded-r-none' : '', tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '', 'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10']">
              <div>
                <div class="flex items-center justify-between gap-x-4">
                  <h3 :id="tier.id" :class="[tier.mostPopular ? 'text-indigo-600' : 'text-gray-900', 'text-lg/8 font-semibold']">{{ tier.name }}</h3>
                  <p v-if="tier.mostPopular" class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600">Most popular</p>
                </div>
                <p class="mt-4 text-sm/6 text-gray-600">{{ tier.description }}</p>
                <p class="mt-6 flex items-baseline gap-x-1">
                  <span class="text-4xl font-semibold tracking-tight text-gray-900">{{ tier.price }}</span>
                  <span class="text-sm/6 font-semibold text-gray-600">one-time</span>
                </p>
                <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-600">
                  <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
                    <CheckIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {{ feature }}
                  </li>
                </ul>
              </div>
              <a :href="tier.href" :aria-describedby="tier.id" :class="[tier.mostPopular ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500' : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300', 'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">Get lifetime access</a>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQs -->
      <div class="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
        <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Frequently asked questions</h2>
        <dl class="mt-10 space-y-8 divide-y divide-gray-900/10">
          <div v-for="faq in faqs" :key="faq.id" class="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <dt class="text-base/7 font-semibold text-gray-900 lg:col-span-5">{{ faq.question }}</dt>
            <dd class="mt-4 lg:col-span-7 lg:mt-0">
              <p class="text-base/7 text-gray-600">{{ faq.answer }}</p>
            </dd>
          </div>
        </dl>
      </div>

      <!-- CTA section -->
      <div class="relative -z-10 mt-32 px-6 lg:px-8">
        <div class="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:bottom-0 sm:right-[calc(50%-6rem)] sm:top-auto sm:translate-y-0 sm:transform-gpu sm:justify-end" aria-hidden="true">
          <div class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25" style="clip-path: polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)" />
        </div>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Start your journey to academic success today</h2>
          <p class="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600">Join thousands of students who have already transformed their academic journey with EduAdvisor.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link to="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</router-link>
            <a href="#" class="text-sm/6 font-semibold text-gray-900">Contact sales <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>

      <!-- Email Signup Section -->
      <div id="signup" class="relative isolate overflow-hidden">
        <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div class="absolute inset-x-0 top-1/2 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
          </div>
          <EmailSignup />
        </div>
      </div>

    </main>

    <!-- Footer -->
    <footer class="relative mx-auto mt-32 max-w-7xl px-6 lg:px-8">
      <div class="border-t border-gray-900/10 py-16 sm:py-24 lg:py-32">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm/6 font-semibold text-gray-900">Solutions</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in footerNavigation.solutions" :key="item.name">
                    <a :href="item.href" class="text-sm/6 text-gray-600 hover:text-gray-900">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm/6 font-semibold text-gray-900">Support</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in footerNavigation.support" :key="item.name">
                    <a :href="item.href" class="text-sm/6 text-gray-600 hover:text-gray-900">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm/6 font-semibold text-gray-900">Company</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in footerNavigation.company" :key="item.name">
                    <a :href="item.href" class="text-sm/6 text-gray-600 hover:text-gray-900">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm/6 font-semibold text-gray-900">Legal</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in footerNavigation.legal" :key="item.name">
                    <a :href="item.href" class="text-sm/6 text-gray-600 hover:text-gray-900">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import {
  ArrowPathIcon,
  Bars3Icon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  XMarkIcon,
  LightBulbIcon,
} from '@heroicons/vue/24/outline'
import { CheckIcon } from '@heroicons/vue/20/solid'
import EmailSignup from '../components/EmailSignup.vue'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'How It Works', href: '#features' },
  { name: 'Universities', href: '#' },
  { name: 'Pricing', href: '#pricing' },
]

const features = [
  {
    name: 'AI-Powered Course Matching',
    description: 'Our advanced AI technology automatically matches your home university courses with host university equivalents, saving hours of manual search.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Credit Transfer Analysis',
    description: 'Get detailed similarity scores and comprehensive analysis to ensure your credits will transfer successfully.',
    icon: ChartBarIcon,
  },
  {
    name: 'Smart Course Database',
    description: 'Access our extensive database of courses from partner universities, updated regularly with real-time information.',
    icon: BookOpenIcon,
  },
  {
    name: 'Time-Saving Automation',
    description: 'Eliminate manual course comparison and streamline your exchange program planning process.',
    icon: ArrowPathIcon,
  },
]

const tiers = [
  {
    name: 'Basic Match',
    id: 'tier-basic',
    href: '#',
    price: '$9.9',
    description: 'Perfect for students just starting their exchange planning.',
    features: [
      'Basic course matching',
      '10 course comparisons/month',
      'Basic similarity scores',
      'Standard support',
      'Access to course database'
    ],
    mostPopular: false,
  },
  {
    name: 'Smart Explorer',
    id: 'tier-explorer',
    href: '#',
    price: '$24.9',
    description: 'Ideal for students actively planning their exchange.',
    features: [
      'Unlimited course matching',
      'Detailed similarity analysis',
      'Priority support',
      'Credit transfer recommendations',
      'Course history tracking',
      'Export reports'
    ],
    mostPopular: true,
  },
  {
    name: 'Premium Transfer',
    id: 'tier-premium',
    href: '#',
    price: '$49.9',
    description: 'Complete solution for serious exchange students.',
    features: [
      'All Explorer features',
      'Advanced AI matching',
      'Custom university additions',
      'Batch course processing',
      'API access',
      'Personal advisor support',
      'Priority updates'
    ],
    mostPopular: false,
  },
]

const faqs = [
  {
    id: 1,
    question: "How accurate is your course matching system?",
    answer: "Our AI-powered system uses advanced language models and vector databases to analyze course descriptions, learning outcomes, and credit requirements. We typically achieve over 90% accuracy in course matching, verified by university exchange offices.",
  },
  {
    id: 2,
    question: "Which universities are supported?",
    answer: "We support major universities worldwide and are constantly expanding our database. Our system can analyze and match courses from any university with available course descriptions.",
  },
  {
    id: 3,
    question: "How does the credit transfer analysis work?",
    answer: "Our system analyzes course descriptions, content, and learning outcomes to generate similarity scores. We provide detailed comparisons and recommendations to help ensure your credits will transfer successfully.",
  },
]

const footerNavigation = {
  solutions: [
    { name: 'Course Matching', href: '#' },
    { name: 'Credit Analysis', href: '#' },
    { name: 'University Database', href: '#' },
    { name: 'API Access', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Contact Support', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Partners', href: '#' },
    { name: 'Universities', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'License', href: '#' },
  ],
}

const mobileMenuOpen = ref(false)

// Hero section text
const heroTitle = "AI-Powered Course Credit Matching for Exchange Students"
const heroDescription = "Stop spending hours manually searching for equivalent courses. Our AI technology automatically matches and analyzes course credits between universities, making your exchange program planning effortless."

// Feature section header
const featureTitle = "Smart Course Credit Matching"
const featureDescription = "Save time and ensure successful credit transfers with our AI-powered platform that automatically matches courses between universities and provides detailed similarity analysis."

const videoUrl = ref('')

onMounted(() => {
  // 动态导入视频
  import('/video1.mov').then(module => {
    videoUrl.value = module.default
  }).catch(err => console.error('Error loading video:', err))
})
</script> 