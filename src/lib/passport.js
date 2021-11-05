const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');



passport.use('local.signin', new LocalStrategy({
    usernameField: 'rut',
    passwordField: 'pass',
    passReqToCallback: true 
}, async(req, rut, pass,done,next) => {

    console.log(req.body);
    console.log(rut);
    console.log(pass);

    const rows = await pool.query('SELECT * FROM users WHERE rut = ?', [rut]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(pass, user.pass);
        if(validPassword){
            done(null, user, req.flash('success' + 'Welcome bith '+ user.nombres));
            next();
        }else {
            done(null, false, req.flash('message' + 'contraseña incorrecta'));
            next();
        }
    }else{
        return done(null, false, req.flash('message' + 'El usuario no existe'));
        
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'rut',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, rut, pass,done) =>{
    console.log(req.body);

    const { id_users,
        nombres,
        apellidos,
        numero_verificador,
        email,
        pass2,
        numero_telefonico,
        numero_telefonico_respaldo,
        direccion,
        numero_direccion,
        id_profesion} = req.body;
    const new_user = {
        id_users,
        nombres,
        apellidos,
        rut,
        numero_verificador,
        email,
        pass,
        numero_telefonico,
        numero_telefonico_respaldo,
        direccion,
        numero_direccion,
        id_profesion,
    };
    new_user.pass = await helpers.encryptPassword(pass);
    const result = await pool.query('INSERT INTO users set ?', [new_user]);
    console.log(result);
    new_user.id_users = result.insertId;
    return done(null, new_user);
}));



passport.serializeUser((user, done) => {
    done(null, user.id_users);

});


passport.deserializeUser( async(id_users, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id_users = ?', [id_users]);
    done(null, rows[0])
});