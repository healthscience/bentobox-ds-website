<template>
  <v-container grid-list-lg>
    <v-responsive class="d-flex align-top text-center fill-height">
      <v-row
        no-gutters
        id="boards"
      >
        <v-col
          align-self="center"
        >
          <v-sheet class="text-h6 pa-2" color="blue-darken-4">Network experiment boards</v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-card color="indigo-lighten-5 ma-2">
          <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
            <v-table theme="light" height="300px" fixed-header striped="even">
              <thead>
                <tr>
                  <th class="text-left">
                    Network
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Experiment
                  </th>
                  <th class="text-left">
                    NXP code
                  </th>
                  <th class="text-left">
                    Learn more
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in pubExperiments"
                  :key="item.name"
                >
                  <td>{{ item.network }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.experiment }}</td>
                  <td>
                    <div class="inline-hop-nxp">
                      <div class="hop-code">{{ item.code }}</div> 
                      <div class="hop-code-copy">
                        <v-btn
                          color="blue"
                          @click="copyHOPnxp(item.code)"
                        >
                          Copy code
                        </v-btn>
                      </div>
                      <div v-if="item.code === hopInvite && hopInvite.length > 0" class="copied-message">
                        Copied to clipboard
                      </div>
                    </div>
                  </td>
                  <td><a href="item.learn">{{ item.learn }}</a></td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-card>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: 'network-boards',
  data: () => ({
    pubExperiments: [
      { 
        network: 'healthCues', name: 'Body composition', experiment: 'changes over time', code: 'hop: coming soon 1', learn: 'https://coherencestream.com/networks'
      },
      { network: 'healthCues', name: 'Body weight', experiment: 'changes over time', code: 'hop: coming soon 2', learn: 'https://coherencestream.com/networks'
      },
      { network: 'caleAI', name: 'Daisyworld', experiment: 'simulate simple planet', code: 'hop: coming soon 3', learn: 'https://caleai.com/'
      }
    ],
    hopInvite: '',
    copiedInvite: null
  }),
  methods: {
    copyHOPnxp (hopnxpCode) {
      navigator.clipboard.writeText(hopnxpCode)
      this.hopInvite = hopnxpCode
      this.copiedInvite = hopnxpCode
    setTimeout(() => {
      this.hopInvite = null
    }, 2000)
    }
  }
}
</script>

<style scoped>
.text-left {
  min-width: 120px;
}

.inline-hop-nxp {
  display: grid;
  grid-template-columns: .4fr .1fr 120px;
  justify-items: start;
}

.hop-code {
  min-width: 180px;
}

.copied-message {
  position: relative;
  background-color: green;
  padding: 4px;
  color: white;
}

.copied-message[style*="display: none"] {
  opacity: 0;
}
</style>