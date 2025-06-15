import Block, { TProps } from "./Block/block";
import Indexed from "./types";
import store, { StoreEvents } from "./Store";
import isEqual from "../utils/isEqual";

export default  function connect(mapStateToProps: (state: Indexed) => Indexed) {
      return function(Component: typeof Block) {
        return class extends Component {
          constructor(props: TProps) {
            let state = mapStateToProps(store.getState());
            super("div", {...props, ...state});

            store.on(StoreEvents.Updated, () => {
                const newState = mapStateToProps(store.getState());
                if (!isEqual(state, newState)) {
                    this.setProps({...newState});
                }
                state = newState;
            });
        }
        }
    }
}
