const express = require('express');
const router = express.Router();

const pool = require('../database');
const helpers = require('../lib/helpers');
const { isLoggedIn } = require('../lib/auth')


//agregar al usuario solo add
router.get('/add2',isLoggedIn, (req, res) => {
    
    res.render('links/add');
});
////////////////////

////////////////////
router.post('/add', isLoggedIn, async (req, res) => {
    const { nombres,
        apellidos,
        rut,
        numero_verificador,
        email,
        pass,
        pass2,
        numero_telefonico,
        numero_telefonico_respaldo,
        direccion,
        numero_direccion,
        id_profesion,
        id_establecimiento
     } = req.body;
    const newLink = {
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
        id_establecimiento
    };

    if(newLink.pass === pass2 ){
        newLink.pass = await helpers.encryptPassword(pass);
        await pool.query('INSERT INTO users set ?', [newLink]);
        req.flash('success',`Usuario Guardado Correctamenmte`);
        res.redirect('/links/add');
    }else{
        req.flash('message','Ha ocurrido un Error, porfavor intente de nuevo.');
        res.redirect('/links/add');
    }
    
});

//listar al usuario

router.get('/listarUsuario', isLoggedIn, async (req, res) => {

    const linkUsuario = await pool.query('SELECT * FROM users ORDER BY id_users');
    res.render('links/listadd', { linkUsuario} );
});


//eliminar usuarios
router.get('/deleteUser/:id_users', isLoggedIn, async (req, res) => {
    const {id_users} = req.params;
    await pool.query('DELETE FROM users WHERE id_users = ?', [id_users]);
    const linkUsuario = await pool.query('SELECT * FROM users ORDER BY id_users');
    req.flash('message','Usuario eliminado correctamente.');
    res.render('links/listadd', { linkUsuario} );
    
});

//Editar usuarios

router.get('/editUser/:id_users', isLoggedIn, async(req, res)=> {
    const {id_users} = req.params;
    const new_edit_users = await pool.query('SELECT * FROM users WHERE id_users = ?', [id_users]);
    console.log(new_edit_users[0]);
    res.render('links/editUser', {new_edit_users: new_edit_users[0]})
});

router.post('/editUser/:id_users', isLoggedIn, async(req, res)=> {
    const {id_users} = req.params;
    const { nombres,
        apellidos,
        rut,
        numero_verificador,
        email,
        pass,
        numero_telefonico,
        numero_telefonico_respaldo,
        direccion,
        numero_direccion
     } = req.body;
     const newLink = {
        nombres,
        apellidos,
        rut,
        numero_verificador,
        email,
        pass,
        numero_telefonico,
        numero_telefonico_respaldo,
        direccion,
        numero_direccion
    };
    newLink.pass = await helpers.encryptPassword(pass);
    await pool.query('UPDATE users set ? WHERE id_users = ?', [newLink, id_users]);
    const linkUsuario = await pool.query('SELECT * FROM users ORDER BY id_users');
    res.render('links/listadd', { linkUsuario} );
});







//agregar Establecimiento addEstablecimiento
router.get('/addEstablecimiento', isLoggedIn, (req, res) => {
    
    res.render('links/addEstablecimiento');
});

router.post('/addEstablecimiento', isLoggedIn, async (req, res) => {
    const {nombre_establecimiento,
        direccion_establecimiento
     } = req.body;
    const newLinkEsta = {
        nombre_establecimiento,
        direccion_establecimiento
    };
    await pool.query('INSERT INTO establecimiento set ?', [newLinkEsta]);
    req.flash('success',`Establecimiento Guardado con Exito`);
    res.render('links/addEstablecimiento');
});




//listar establecimiento
router.get('/listarEstablecimiento', isLoggedIn, async (req, res) => {

    const linkEstablecimiento = await pool.query('SELECT * FROM establecimiento ORDER BY id_establecimiento');
    res.render('links/listaddEstablecimiento', { linkEstablecimiento});
});
router.get('/add', async (req, res) => {

    const linkEstablecimiento2 = await pool.query('SELECT * FROM establecimiento ORDER BY id_establecimiento');
    res.render('links/add', { linkEstablecimiento2});
});



//eliminaer establecimiento
router.get('/deleteEst/:id_establecimiento', isLoggedIn, async (req, res) => {
    const {id_establecimiento} = req.params;
    await pool.query('DELETE FROM establecimiento WHERE id_establecimiento = ?', [id_establecimiento]);
    const linkEstablecimiento = await pool.query('SELECT * FROM establecimiento ORDER BY id_establecimiento');
    res.render('links/listaddEstablecimiento', { linkEstablecimiento});
});


//editar establecimiento
router.get('/editEsta/:id_establecimiento', isLoggedIn, async(req, res)=> {
    const {id_establecimiento} = req.params;
    const new_edit_esta = await pool.query('SELECT * FROM establecimiento WHERE id_establecimiento = ?', [id_establecimiento]);
    console.log(new_edit_esta[0]);
    res.render('links/editEsta', {new_edit_esta: new_edit_esta[0]})
});

router.post('/editEsta/:id_establecimiento', isLoggedIn, async(req, res)=> {
    const {id_establecimiento} = req.params;
    const {nombre_establecimiento,
        direccion_establecimiento
     } = req.body;
    const newLinkEsta = {
        nombre_establecimiento,
        direccion_establecimiento
    };
    await pool.query('UPDATE establecimiento set ? WHERE id_establecimiento = ?', [newLinkEsta, id_establecimiento]);
    const linkEstablecimiento = await pool.query('SELECT * FROM establecimiento ORDER BY id_establecimiento');
    res.render('links/listaddEstablecimiento', { linkEstablecimiento});
});


//-----------------------------------------------------------------------------------------


// agregar profesion add

router.get('/addProfesion', isLoggedIn, (req, res) => {
    
    res.render('links/addProfesion');
});

router.post('/addProfesion',isLoggedIn,  async (req, res) => {
    const {
        nombre_profesion
    } = req.body;
    const newLinkProfesion = {
        nombre_profesion
    };
    await pool.query('INSERT INTO profesion set ?', [newLinkProfesion]);
    req.flash('success','Profesión añadida correctamente.');
    res.render('links/addProfesion');
});
//listar profesion

router.get('/listarProfesion', isLoggedIn, async (req, res) => {
    const linkProfesion = await pool.query('SELECT * FROM profesion ORDER BY id_profesion');
    res.render('links/listadoProfesion', { linkProfesion});
});

//eliminaer profesion
router.get('/deleteProfesion/:id_profesion', isLoggedIn, async (req, res) => {
    const {id_profesion} = req.params;
    await pool.query('DELETE FROM profesion WHERE id_profesion = ?', [id_profesion]);
    const linkProfesion = await pool.query('SELECT * FROM profesion ORDER BY id_profesion');
    req.flash('success','Profesión Eliminada correctamente.');
    res.render('links/listadoProfesion', { linkProfesion});
});



//Editar profesion

router.get('/editProfe/:id_profesion', isLoggedIn, async(req, res)=> {
    const {id_profesion} = req.params;
    const new_edit_profesion = await pool.query('SELECT * FROM profesion WHERE id_profesion = ?', [id_profesion]);
    res.render('links/editProfe', {new_edit_profesion: new_edit_profesion[0]})
});

router.post('/editProfe/:id_profesion', isLoggedIn, async(req, res)=> {
    const {id_profesion} = req.params;
    const { nombre_profesion} = req.body;
    const newLinkProfesion = { nombre_profesion};
    await pool.query('UPDATE profesion set ? WHERE id_profesion = ?', [newLinkProfesion, id_profesion]);
    const linkProfesion = await pool.query('SELECT * FROM profesion ORDER BY id_profesion');
    req.flash('success','Profesión Editada correctamente.');
    res.render('links/listadoProfesion', { linkProfesion});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////














//prueba de agregar Paciente add

router.get('/addPaciente', isLoggedIn, (req, res) => {
    
    res.render('links/addPaciente');
});

router.post('/addPaciente', isLoggedIn, async (req, res) => {

 const { agregar } = req.body;

const { rut, nombre, fecha_nacimiento, edad,
        sexo, telefono,paciente_postrado, participa_pueblos_originarios,
        poblacion_inmigrante, plan_familiar, presion_s, presion_d,
        fecha_PA,AM_SOLO_C_R, peso, talla, imc, estado_nutricional, TAB,OBES,
        SEDENT,Antec_IAM,antec_enf_CV,tto_con_aspirina,tto_con_estatina,
        TACO, fecha_rescate, rescate_telefonico_efectivo,
        rescate_domiciliario_efectivo, ultimo_control, est,
        ultimo_control_presenc_tel, proximo_control, proximo_profesional,
        ultimo_control_a_distancia, control_a_distancia_efectivo,
        profesional_que_realizo_aten_dist, derivado_a_QF,q_farmac_presencial,
        fecha_atencion_a_distancia, atencion_a_distancia, 
        Proximo_control_Q_farmaceutico, fecha_citacion, via_citacion,
        confirmacion_de_cita, inasistencia, hta, DM, DLP, HipoT,
        Park, Epil, Glauc, GAA, INT_GLUC, INS_RESIST, Alzh, Otras_patologias,
        Artrosis, Hb, valor_H_Glicos, fecha, total, LDL, fecha_fondo_ojo,
        resultado, proximo_fondo_de_ojo, fecha_pie_diabetico, riesgo_pie_diabetico,
        curacion_pie_diabetico, fecha_inicio_curacion, fecha_termino_curacion,
        amput, tipo_amputacion, fecha_amutacion, control_podologo,
        fecha_podologo, fecha_atencion_telefonica_podologo,
        atencion_telefonica_efectiva, proximo_control_podogolo,
        prog_mas,fecha_P5, EMPAM, time_up_and_go, estacion_unipodal,
        Minimental, indice_barthel, dependencia_severa, escaras,
        sospecha_maltrato, actividad_fisica,
        trans_del_humor, sus_psicotropicas, transt_comport,
        trans_ansiedad, otras_demencias, esquizofrenia,
        transt_alimentaria, retraso_mental, transt_personalidad,
        transt_generalizado_del_desarrollo, otras_programa_salud_mental

    } = req.body;

const new_link_datos = {
    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R
   };
const new_link_imc = {
    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    peso, talla, imc ,estado_nutricional
};

const new_link_factor_riesgo = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    TAB,OBES, SEDENT,Antec_IAM,antec_enf_CV,
    tto_con_aspirina,tto_con_estatina,TACO,
};

const new_link_rescate_paciente = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    fecha_rescate, rescate_telefonico_efectivo,
    rescate_domiciliario_efectivo
}

const new_link_atencion_men = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    ultimo_control, est, ultimo_control_presenc_tel,
    proximo_control, proximo_profesional,
    ultimo_control_a_distancia, control_a_distancia_efectivo,
    profesional_que_realizo_aten_dist
}

const new_link_q_f = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    derivado_a_QF,q_farmac_presencial,
    fecha_atencion_a_distancia, atencion_a_distancia, 
    Proximo_control_Q_farmaceutico, fecha_citacion, via_citacion,
    confirmacion_de_cita, inasistencia,
}

const new_link_patologia = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    DM, DLP, HipoT, Park, Epil, Glauc, GAA, INT_GLUC,
    INS_RESIST, Alzh, Otras_patologias,Artrosis
}
const new_link_diabetes = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    Hb, valor_H_Glicos
}
const new_link_colesterol = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    fecha, total, LDL
}
const new_link_fondo_ojo = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    fecha_fondo_ojo, resultado, proximo_fondo_de_ojo
}
const new_link_pie_diabetico = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    fecha_pie_diabetico, riesgo_pie_diabetico,
    curacion_pie_diabetico, fecha_inicio_curacion, 
    fecha_termino_curacion, amput,
    tipo_amputacion, fecha_amutacion
}
const new_link_podologo = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    control_podologo, fecha_podologo,
    fecha_atencion_telefonica_podologo,
    atencion_telefonica_efectiva, 
    proximo_control_podogolo
}
const new_link_p5 = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    prog_mas,fecha_P5, EMPAM, time_up_and_go, estacion_unipodal,
    Minimental, indice_barthel, dependencia_severa, escaras,
    sospecha_maltrato, actividad_fisica,
}
const new_link_salud_mental = {

    rut, nombre,fecha_nacimiento, edad,
    sexo, telefono,paciente_postrado,
    participa_pueblos_originarios,
    poblacion_inmigrante, plan_familiar,
    presion_s, presion_d, fecha_PA, AM_SOLO_C_R,

    trans_del_humor, sus_psicotropicas, transt_comport,
    trans_ansiedad, otras_demencias, esquizofrenia,
    transt_alimentaria, retraso_mental, transt_personalidad,
    transt_generalizado_del_desarrollo, otras_programa_salud_mental,
}

switch(agregar){
    case "1":
        await pool.query("INSERT INTO paciente set ?", [new_link_datos]);
        req.flash('success','Paciente agregado correctamente.');
        res.redirect('/links/addPaciente');
        break;
    case "2":
        await pool.query("INSERT INTO paciente set ?", [new_link_imc]);
        req.flash('success','Paciente agregado correctamente.');
        res.redirect('/links/addPaciente');
        break;

    case "3":
        await pool.query("INSERT INTO paciente set ?", [new_link_factor_riesgo]);
        res.redirect('/links/addPaciente');
        break;

    case "4":
        await pool.query("INSERT INTO paciente set ?", [new_link_rescate_paciente]);
        res.redirect('/links/addPaciente');
        break;

    case "5":
        await pool.query("INSERT INTO paciente set ?", [new_link_atencion_men]);
        res.redirect('/links/addPaciente');
        break;

    case "6":
        await pool.query("INSERT INTO paciente set ?", [new_link_q_f]);
        res.redirect('/links/addPaciente');
        break;

    case "7":
        await pool.query("INSERT INTO paciente set ?", [new_link_patologia]);
        res.redirect('/links/addPaciente');
        break;

    case "8":
        await pool.query("INSERT INTO paciente set ?", [new_link_diabetes]);
        res.redirect('/links/addPaciente');
        break;

    case "9":
        await pool.query("INSERT INTO paciente set ?", [new_link_colesterol]);
        res.redirect('/links/addPaciente');
        break;

    case "10":
        await pool.query("INSERT INTO paciente set ?", [new_link_fondo_ojo]);
        res.redirect('/links/addPaciente');
        break;

    case "11":
        await pool.query("INSERT INTO paciente set ?", [new_link_pie_diabetico]);
        res.redirect('/links/addPaciente');
        break;
    
    case "12":
        await pool.query("INSERT INTO paciente set ?", [new_link_podologo]);
        res.redirect('/links/addPaciente');
        break;
    
    case "13":
        await pool.query("INSERT INTO paciente set ?", [new_link_p5]);
        res.redirect('/links/addPaciente');
        break;
    case "14":
        await pool.query("INSERT INTO paciente set ?", [new_link_salud_mental]);
        res.redirect('/links/addPaciente');

    default:
        await pool.query("INSERT INTO paciente set ?", [new_link_datos]);
        res.redirect('/links/addPaciente');
        break;   
};

console.log("resultado 2: ", agregar);
});


//listar paciente
router.get('/listarPaciente', isLoggedIn, async (req, res) => {

    const newLinkPaciente = await pool.query('SELECT * FROM paciente ORDER BY id_paciente');
    res.render('links/listaddPaciente', { newLinkPaciente} );
});
//eliminar paciente

router.get('/deletePaciente/:id_paciente', isLoggedIn, async (req, res) => {
    const {id_paciente} = req.params;
    await pool.query('DELETE FROM paciente WHERE id_paciente = ?', [id_paciente]);
    const newLinkPaciente = await pool.query('SELECT * FROM paciente ORDER BY id_paciente');
    res.render('links/listaddPaciente', { newLinkPaciente} );
    
});




//Editar pasiente

router.get('/editPasi/:id_paciente', isLoggedIn, async(req, res)=> {
    const {id_paciente} = req.params;
    const new_edit_paci = await pool.query('SELECT * FROM paciente WHERE id_paciente = ?', [id_paciente]);
    console.log(new_edit_paci[0]);
    res.render('links/editPasi', {new_edit_paci: new_edit_paci[0]})
});

router.post('/editPasi/:id_paciente', isLoggedIn, async(req, res)=> {
    const {id_paciente} = req.params;
    const { rut, nombre, fecha_nacimiento, edad,
        sexo, telefono,paciente_postrado, participa_pueblos_originarios,
        poblacion_inmigrante, plan_familiar, presion_s, presion_d,
        fecha_PA,AM_SOLO_C_R, peso, talla, imc, estado_nutricional, TAB,OBES,
        SEDENT,Antec_IAM,antec_enf_CV,tto_con_aspirina,tto_con_estatina,
        TACO, fecha_rescate, rescate_telefonico_efectivo,
        rescate_domiciliario_efectivo, ultimo_control, est,
        ultimo_control_presenc_tel, proximo_control, proximo_profesional,
        ultimo_control_a_distancia, control_a_distancia_efectivo,
        profesional_que_realizo_aten_dist, derivado_a_QF,q_farmac_presencial,
        fecha_atencion_a_distancia, atencion_a_distancia, 
        Proximo_control_Q_farmaceutico, fecha_citacion, via_citacion,
        confirmacion_de_cita, inasistencia, hta, DM, DLP, HipoT,
        Park, Epil, Glauc, GAA, INT_GLUC, INS_RESIST, Alzh, Otras_patologias,
        Artrosis, Hb, valor_H_Glicos, fecha, total, LDL, fecha_fondo_ojo,
        resultado, proximo_fondo_de_ojo, fecha_pie_diabetico, riesgo_pie_diabetico,
        curacion_pie_diabetico, fecha_inicio_curacion, fecha_termino_curacion,
        amput, tipo_amputacion, fecha_amutacion, control_podologo,
        fecha_podologo, fecha_atencion_telefonica_podologo,
        atencion_telefonica_efectiva, proximo_control_podogolo,
        prog_mas,fecha_P5, EMPAM, time_up_and_go, estacion_unipodal,
        Minimental, indice_barthel, dependencia_severa, escaras,
        sospecha_maltrato, actividad_fisica,
        trans_del_humor, sus_psicotropicas, transt_comport,
        trans_ansiedad, otras_demencias, esquizofrenia,
        transt_alimentaria, retraso_mental, transt_personalidad,
        transt_generalizado_del_desarrollo, otras_programa_salud_mental
     } = req.body;
     const newLink_edit = {
        rut, nombre, fecha_nacimiento, edad,
        sexo, telefono,paciente_postrado, participa_pueblos_originarios,
        poblacion_inmigrante, plan_familiar, presion_s, presion_d,
        fecha_PA,AM_SOLO_C_R, peso, talla, imc, estado_nutricional, TAB,OBES,
        SEDENT,Antec_IAM,antec_enf_CV,tto_con_aspirina,tto_con_estatina,
        TACO, fecha_rescate, rescate_telefonico_efectivo,
        rescate_domiciliario_efectivo, ultimo_control, est,
        ultimo_control_presenc_tel, proximo_control, proximo_profesional,
        ultimo_control_a_distancia, control_a_distancia_efectivo,
        profesional_que_realizo_aten_dist, derivado_a_QF,q_farmac_presencial,
        fecha_atencion_a_distancia, atencion_a_distancia, 
        Proximo_control_Q_farmaceutico, fecha_citacion, via_citacion,
        confirmacion_de_cita, inasistencia, hta, DM, DLP, HipoT,
        Park, Epil, Glauc, GAA, INT_GLUC, INS_RESIST, Alzh, Otras_patologias,
        Artrosis, Hb, valor_H_Glicos, fecha, total, LDL, fecha_fondo_ojo,
        resultado, proximo_fondo_de_ojo, fecha_pie_diabetico, riesgo_pie_diabetico,
        curacion_pie_diabetico, fecha_inicio_curacion, fecha_termino_curacion,
        amput, tipo_amputacion, fecha_amutacion, control_podologo,
        fecha_podologo, fecha_atencion_telefonica_podologo,
        atencion_telefonica_efectiva, proximo_control_podogolo,
        prog_mas,fecha_P5, EMPAM, time_up_and_go, estacion_unipodal,
        Minimental, indice_barthel, dependencia_severa, escaras,
        sospecha_maltrato, actividad_fisica,
        trans_del_humor, sus_psicotropicas, transt_comport,
        trans_ansiedad, otras_demencias, esquizofrenia,
        transt_alimentaria, retraso_mental, transt_personalidad,
        transt_generalizado_del_desarrollo, otras_programa_salud_mental
    };

    if(newLink_edit != ""){

        await pool.query('UPDATE paciente set ? WHERE id_paciente = ?', [newLink_edit, id_paciente]);
        const newLinkPaciente = await pool.query('SELECT * FROM paciente ORDER BY id_paciente');
        res.render('links/listaddPaciente', { newLinkPaciente} );
    }
    
    
});

module.exports = router;