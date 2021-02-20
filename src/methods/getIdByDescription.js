
function getIdByDescription(type,description) {
    let id;
    switch (type) {
        case "university":{
            for (let i = 0; i <this.$store.state.universities.length ; i++) {
                if (this.$store.state.universities[i].universityDescription===description){
                    id = this.$store.state.universities[i].universityId;
                    break;
                }
            }
            break;
        }
        case "college":{
            for (let i = 0; i <this.$store.state.colleges.length ; i++) {
                if (this.$store.state.colleges[i].collegeDescription===this.register_form.college){
                    id = this.$store.state.colleges[i].collegeId;
                    break;
                }
            }
            break;
        }
        case "direction":{
            for (let i = 0; i < this.$store.state.directions.length; i++) {
                if (this.$store.state.directions[i].directionDescription === description) {
                    id = this.$store.state.directions[i].directionId;
                    break;
                }
            }
            break;
        }
    }
    return id;
}

export default getIdByDescription();