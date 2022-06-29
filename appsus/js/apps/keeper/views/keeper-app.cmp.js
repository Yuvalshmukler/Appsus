
import { keeperService }  from "../services/keeper-service.js"

import notePreview from "../cmps/notes-preview.cmp.js";


export default {

    template: `
        <section class="notes-app">
            <h1>Keeper</h1>
            <ul>
            <li v-for="(note,idx) in notes" :key="note.id"  class="notes-preview-container">
                <note-preview :note="note"/>
            </li>
        </ul>
        </section>
        `,
    
    data() {
        return {
            notes: null,
        }
    },

    created() {
        keeperService.query().then(notes => this.notes = notes )
    },

    components:{
        notePreview,      
    },
    methods: {
    },
    computed: {
    },
    unmounted() {
    },

}