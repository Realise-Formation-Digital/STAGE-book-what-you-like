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
    update:'removeReservation',
    delete:'updateReservation'
  },
  thing: {
    insert:'insertThing',
    update:'updateThing',
    delete:'removeThing'
  }
}

export {
  paths,
  meteorMethods
}
