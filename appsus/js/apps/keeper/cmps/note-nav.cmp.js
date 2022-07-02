
import { keeperService }  from "../services/keeper-service.js"
import { eventBus } from '../../../services/eventBus-service.js';

export default {
    props: [],
    template: `
        <section class="note-nav">

          <h4><img src="img/keeper.png"/>Kepper</h4>

       
            <h4 class="active-nav"><i class="fa-solid fa-tag"></i> Labels</h4>
            
            <ul>
                <h3 :class="isActive('all')" @click="filter({by:'label', value:'all'})">All</h3>
                <li  v-for="label in labels" >
                <h3 :class="isActive(label)" @click="filter({by:'label', value:label})">{{label}}</h3>
                </li>
            </ul>

            <h4 class="active-nav"><i class="fa-solid fa-font-awesome"></i>  Type</h4> 
            <ul>
            <h3 :class="isActive('all')" @click="filter({by:'type', value:'all'})">All</h3>
              <h3 :class="isActive('note-txt')" @click="filter({by:'type', value:'note-txt'})">Text</h3>
              <h3 :class="isActive('note-img')" @click="filter({by:'type', value:'note-img'})">Image</h3>
              <h3 :class="isActive('note-video')" @click="filter({by:'type', value:'note-video'})">Video</h3>
              <h3 :class="isActive('note-todos')" @click="filter({by:'type', value:'note-todos'})">List</h3>
              </ul>
<!-- 
            <h4><i class="fa-solid fa-trash-can"></i>   Trash</h4> -->

           
        </section>
  `,
    data() {
      return {
        labels: keeperService.getLabels(),
        filterBy: {
          type: '',
          label: '',
        }
      }
    },
    created(){
      this.unsubscribe = eventBus.on('render-label', this.renderLabel)
    },
    methods: {
      filter(filterBy){
        // console.log(filterBy)
        console.log(filterBy.value)
        if (filterBy.by === 'type') this.filterBy.type = filterBy.value
        if (filterBy.by === 'label') this.filterBy.label = filterBy.value
        console.log(this.filterBy)

        if(filterBy.value === 'all') filterBy.value = ''
        
        eventBus.emit('filter-nav', filterBy)
      },
      isActive(value){
        if ( value === this.filterBy.type) return 'active-nav'
        if (value === this.filterBy.label) return 'active-nav'
      },
      renderLabel(label){
       console.log('reciving?')
       this.labels.push(label)     
      }

    },
    computed: {
     
    },
    unmounted() {
      this.unsubscribe()
  },
  }
  
  