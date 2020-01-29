'use strict';

const User = require('../models/user');

const Accounts = {
    index: {
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Car Park Management System' });
        }
    },
    showSignup: {
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Car Park Management System' });
        }
    },
    signup: {
        auth: false,
        handler: async function(request, h) {
            try {
                const payload = request.payload;
                let user = await User.findByEmail(payload.email);
                if (user) {
                    const message = 'Email address is already registered';
                    throw new Boom(message);
                }
                const newUser = new User({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password
                });
                user = await newUser.save();
                //request.cookieAuth.set({ id: user.id });
                return h.redirect('/home');
            } catch (err) {
                return h.view('signup', { errors: [{ message: err.message }] });
            }
        }
    },
    showLogin: {
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Car Park Management System' });
        }
    },
    login: {
        auth: false,
        handler: async function(request, h) {
            const { email, password } = request.payload
            let user = await User.findByEmail(email)
            if(!user) {
                return h.redirect('/');
            }
            if (user.comparePassword(password)) {
                //request.cookieAuth.set({ id: user.id })
                return h.redirect('/home');
            }
            return h.redirect('/');
        }
    },

    logout: {
        handler: function(request, h) {
            return h.redirect('/');
        }
    }

    /*
    showSettings: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        return h.view('settings', { title: 'Donation Settings', user: user });
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },
  updateSettings: {
    handler: async function(request, h) {
      const userEdit = request.payload;
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      user.firstName = userEdit.firstName;
      user.lastName = userEdit.lastName;
      user.email = userEdit.email;
      user.password = userEdit.password;
      await user.save();
      return h.redirect('/settings');
    }
  },
     */
};

module.exports = Accounts;