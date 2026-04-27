let user: IUser | null = null;

export const userManager = {
  getUser(): IUser | null {
    return user;
  },
  setUser(newUser: IUser | null) {
    user = newUser;
  },
  clear() {
    user = null;
  },
};
