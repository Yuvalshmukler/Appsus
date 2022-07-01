
import { keeperService }  from "../services/keeper-service.js"
import { eventBus } from '../../../services/eventBus-service.js';

export default {
    props: [],
    template: `
        <section class="note-nav">
          
            <h4 class="active-nav"><i class="fa-solid fa-lightbulb"></i> Notes</h4>
            <h4><i class="fa-solid fa-tag"></i> Labels</h4>
            
            <ul>
                <h3 :class="isActive('')" @click="filter({by:'label', value:''})">All</h3>
                <li  v-for="label in labels" >
                <h3 :class="isActive(label)" @click="filter({by:'label', value:label})">{{label}}</h3>
                </li>
            </ul>

            <h4><i class="fa-solid fa-font-awesome"></i>  Type</h4> 
            <ul>
            <h3 :class="isActive('')" @click="filter({by:'type', value:''})">All</h3>
              <h3 :class="isActive('note-txt')" @click="filter({by:'type', value:'note-txt'})">Text</h3>
              <h3 :class="isActive('note-img')" @click="filter({by:'type', value:'note-img'})">Image</h3>
              <h3 :class="isActive('note-video')" @click="filter({by:'type', value:'note-video'})">Video</h3>
              <h3 :class="isActive('note-todos')" @click="filter({by:'type', value:'note-todos'})">List</h3>
              </ul>

            <h4><i class="fa-solid fa-trash-can"></i>   Trash</h4>

            <!-- {{filterBy}} -->
        </section>
  `,
    data() {
      return {
        labels: keeperService.getLabels(),
        filterBy: null,
      }
    },
    created(){
      // this.labels = keeperService.getLabels()
    },
    methods: {
      filter(filterBy){
        console.log(filterBy)
        eventBus.emit('filter-nav', filterBy)
        this.filterBy = filterBy

      },
      isActive(value){
        console.log(value)
        if (!this.filterBy) return
        if (value === this.filterBy.value) return 'active-nav'
      },

    },
    computed: {
     
    },
  }
  
  