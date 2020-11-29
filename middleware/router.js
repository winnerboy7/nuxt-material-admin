import { Role } from "@/controllers/role";

export default function({ store, redirect ,route }) {
  console.log('#MIDDLEWARE#');

  if (store.state.account.status.loggedIn) {
    // console.log('*IS LOGIN*');
    console.log(`IS : ${store.state.account.user.role}`);
    console.log(route.fullPath)

    if (store.state.account.user.role === Role.Admin) {
      redirect("/admin");
    } else if (store.state.account.user.role === Role.Area) { 
      redirect("/area");
    } else if (store.state.account.user.role === Role.School) {
      return redirect("/school");
    }
  }
  else {
    console.log('*IS GUEST*');
    redirect("/login");
  }
}
