import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Hooks and Functions
import { RootState } from '../../app/store';

// Data and Types
import { Member } from '../../types/data.types';

// -----------------------

// team is an array of object, and each object should have the same keys in Member type to prevent errors
const initialState: { team: Member[] } = {
  team: [],
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchMembers: (state, action: PayloadAction<Member[]>) => {
      if (state.team.length === 0) state.team.push(...action.payload);
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.team.push(action.payload);
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.team)`
export const selectTeam = (state: RootState) => state.team.team;

export const { fetchMembers, addMember } = teamSlice.actions;

export default teamSlice.reducer;
