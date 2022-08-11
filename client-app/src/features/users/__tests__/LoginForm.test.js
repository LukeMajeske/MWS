import{render,screen} from  "@testing-library/react"
import { StoreContext, useStore } from "../../../app/stores/store";
import LoginForm from "../LoginForm";
import store from "./app/stores/store"

test("did render email input",()=>{
        render(<StoreContext.Provider value={store}><LoginForm/></StoreContext.Provider>);
    });
