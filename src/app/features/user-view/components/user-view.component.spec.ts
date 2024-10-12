import { UserViewComponent } from "./user-view.component";

describe('User View', ()=>{
    
     function setup() {
        const mockUserTableFormService = jasmine.createSpyObj('UserTableFormService', ['createUserTableForm']);
        const mockStore = jasmine.createSpyObj('Store', ['select']);
        const component = new UserViewComponent(mockUserTableFormService, mockStore);
        return {
            component,
            mockStore,
            mockUserTableFormService
        }
    }
    
    it('creates the component', () => {
      const {component} = setup();
      
      expect(component).toBeDefined();
    });
})