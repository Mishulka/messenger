import Block, { TProps } from "./block";
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

// function mapUserToProps(state) {
//   return {
//     name: state.user.name,
//     avatar: state.user.avatar,
//   };
// }


// сравнение старого и нового состояния
//  const newState = mapStateToProps(state);
    
//     if (!isEqual(oldState, newState)) {
//        обновляем компонент
//     }

//example of usage
// connect(UserProfile, mapUserToProps);

//каррирование функции
//const withUser = connect(state => ({ user: state.user }));

// withUser(UserProfile);
// withUser(SettingsPage); 