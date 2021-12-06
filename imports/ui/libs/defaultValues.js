const paths = {
  home: "/",
  contactUs: "/contact-us",
  aboutUs: "/about-us",
  things: "/things",
  user: "/user",
  category: '/category',
  reservation: '/reservation',
  calendar: '/calendar',

}

const meteorMethods = {
  category: {
    insert:'insertCategory',
    update:'updateCategory',
    delete:'removeCategory'
  },
  reservation: {
    insert:'insertReservation',
    update:'updateReservation',
    delete:'removeReservation'
  },
  thing: {
    insert:'insertThing',
    update:'updateThing',
    delete:'removeThing'
  },
  user: {
    insert:'insertUser',
    update:'updateUser',
    delete:'removeUser'
  }
}

export {
  paths,
  meteorMethods
}
