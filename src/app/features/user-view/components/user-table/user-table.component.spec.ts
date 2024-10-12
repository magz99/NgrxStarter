import { UserTableComponent } from "./user-table.component";

// Use TestBed or another library to test the template result
describe('User Table Component', ()=>{
    function setup() {
       const component = new UserTableComponent();
        return {
            component,
        }
    }
    
    it('creates the component', () => {
      const {component} = setup();

      expect(component).toBeDefined();
    });
})