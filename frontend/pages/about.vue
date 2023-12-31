<template>
  <div>
    <!-- top banner -->
    <the-banner v-if="getAboutPageHero && getAboutPageHero.primaryMediaUrl" :bannerLink="getAboutPageHero.primaryMediaUrl">
      <template #header>
        <span class="text-2xl md:text-4xl mt-5 sm:mt-0 inline-block">{{getAboutPageHero.data.title}}</span>
      </template>
      <template #breadcrumbs>
        <li>
          <nuxt-link to="/" class="font-semibold">Home</nuxt-link>
        </li>
        <li><span class="mx-2">-</span></li>
        <li>
          <span class="font-semibold text-primary-500">About Us</span>
        </li>
      </template>
    </the-banner>

    <!-- 1st section -->
    <div class="container bg-white lg:flex text-gray-700 my-10 lg:my-16">
      <div class="lg:w-1/2  flex justify-center items-center">
        <img :src="getOwnerSection.primaryMediaUrl" class="h-80" alt="">
      </div>
      <div class="lg:w-1/2 mt-10 lg:mt-0 flex items-center">
        <div v-if="getOwnerSection && getOwnerSection.data">
          <h5 class="font-bold text-3xl lg:text-5xl text-gray-700 leading-snug">
            {{getOwnerSection.data.title}}
          </h5>
          <p class="mt-7 border-l-2 border-primary-500 pl-3 italic">
            {{getOwnerSection.data.subtitle}}
          </p>
          <p class="mt-7">{{getOwnerSection.data.description}}</p>
        </div>
      </div>
    </div>

    <!-- why choose us -->
    <div class="py-10 lg:py-16" style="background: #F8F5F2">
      <div class="container text-gray-700">
        <!-- section header -->
        <section-header>
          <template #title>
            <span class="font-bold">
              Why Choose Us
            </span>
          </template>
          <template #subtitle>
            Completely network impactful users whereas next-generation
            applications engage out thinking via tactical action.
          </template>
        </section-header>

        <!-- cards -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          <!-- card 1 -->
          <div class="choose-us-card" v-for="(item, i) in whyChooseUs" :key="i">
            <div class="flex items-center">
              <div class="bg-white rounded-full h-12 w-12 p-2 border-2 border-primary-500 flex-none">
                <img :src="item.primaryMediaUrl" class="h-full w-full object-contain" alt="">
              </div>
              <h5 class="text-2xl font-semibold ml-3">{{item.title}}</h5>
            </div>
            <p class="mt-5">{{item.description}}</p>
          </div>

        </div>
      </div>
    </div>

    <!-- faq -->
    <div class="container">
      <div class="md:w-10/12 lg:w-7/12 mx-auto my-10 lg:my-16">
        <!-- section header -->
        <section-header>
          <template #title>
            <span class="font-bold">
              Frequently Asked Questions
            </span>
          </template>
          <template #subtitle>
            Here you'll be able find answers your questions
          </template>
        </section-header>

        <div class="mt-10">
          <client-only>
            <VueFaqAccordion :items="getAboutFaqs" />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueFaqAccordion from "vue-faq-accordion";

export default {
  name: "AboutUs",
  components: { VueFaqAccordion },
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      getOwnerSection: "config/getOwnerSection",
      getAboutPageHero: "config/getAboutPageHero",
      getAboutFaqs: "config/getAboutFaqs",
      whyChooseUs: "config/whyChooseUs"
    })
  }
};
</script>

<style lang="scss">
.choose-us-card {
  @apply py-4 px-5 md:py-8 md:px-10 bg-white rounded-lg shadow-sm border-2 border-transparent hover:border-primary-500 hover:shadow transition duration-300 cursor-default;
}

.faq-wrapper {
  margin-left: auto !important;
  margin-right: auto !important;
}

.accordion {
  border: none !important;
}

.accordion__item {
  margin-top: 13px !important;
  border-bottom: none !important;

  .accordion__title {
    background-color: #f8f5f2 !important;
    padding: 12px 20px !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
  }

  .accordion__value {
    padding: 10px 20px !important;
  }

  .accordion__toggle-button {
    transition: all 0.01s !important;
  }
}
</style>
