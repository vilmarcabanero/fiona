import { UserState } from 'app/pages/Auth/slice/types';
import { PostState } from 'app/pages/PostPage/slice/types';
import { ThemeState } from 'styles/theme/slice/types';
import { ProfileState } from 'app/pages/ProfilePage/slice/types';
import { ChatPageState } from 'app/pages/ChatPage/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  post?: PostState;
  user?: UserState;
  profile?: ProfileState;
  chatPage?: ChatPageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
