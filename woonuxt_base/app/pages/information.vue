<script lang="ts" setup>
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();

useHead({
  title: `Aniene | Information`,
  meta: [
    {
      name: 'description',
      content: `Aniene è un progetto editoriale ideato nel 2021 dall'artista e curatore Alessandro Dandini de Sylva in collaborazione con il designer Filippo Nostri e dedicato a libri di artisti, curatori e spazi culturali indipendenti presenti a Roma o con un rapporto speciale con la Città.`,
    },
    {
      name: 'keyword',
      content: `Aniene, Aniene Roma, Aniene Libri, Aniene Pubblicazioni, Aniene Edizioni, Aniene Books, Aniene Publications, Aniene Editions, Alessandro Dandini de Sylva, Filippo Nostri, Luca Grechi, José Angelino, Giulio Catelli, Marco Emmanuele, Silvia Argiolas, Diego Miguel Mirabella, Gilles Raynaldy, Michela de Mattei, Operativa Arte Contemporanea, Galleria Alessandra Bonomo, Studio SALES, Richter Fine Art, Pianobi, Isabella Vitale, Saverio Verini, Christian Oxenius, Val Plumwood, Jason Hribal, Filipa Ramos, Fondazione Pastificio Cerere, Marco Affaitati, Paolo Assenza, Orazio Battaglia, Dario Carratta, Valerio Di Fiore, Marco Eusepi, Krizia Galfo, Alessandro Giannì, Charlotte Janis, Emiliano Maggi, Andrea Mauti, Gianni Politi, Fabrizio Sartori, Caterina Silva, Giuseppe Armogida, Davide Silvioli, Fondazione Carla Fendi, Mahler & LeWitt Studios, Marco Deserto, Gianni Garrera`,
    }
  ],
  link: [{ rel: 'canonical', href: 'https://www.anienepublishing.it/information' }],
});
</script>

<template>
  <div class="info-container">
    <!-- <div :class="[locale !== 'en' ? 'hide' : '']" v-if="page" v-html="page.content"></div>
    <div :class="[locale === 'en' ? 'hide' : '']" v-if="pageIT" v-html="pageIT.content"></div> -->
  </div>
</template>
