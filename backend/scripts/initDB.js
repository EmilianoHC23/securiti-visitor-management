import mongoose from 'mongoose';
import User from '../models/User.js';
import '../models/Company.js'; // Importar modelo Company
import dotenv from 'dotenv';

dotenv.config();

const initDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Crear empresa por defecto
    let defaultCompany = await mongoose.model('Company').findOne({ name: 'SecuriTI Corp' });
    
    if (!defaultCompany) {
      defaultCompany = new (mongoose.model('Company'))({
        name: 'SecuriTI Corp',
        location: 'Oficina Principal',
        settings: {
          autoApprove: false,
          requirePhoto: true
        }
      });
      await defaultCompany.save();
      console.log('✅ Empresa por defecto creada: SecuriTI Corp');
    }

    // Verificar si ya existe un admin
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      // Crear usuario admin por defecto
      const adminUser = new User({
        email: 'admin@securiti.com',
        password: 'admin123', // Se encriptará automáticamente
        firstName: 'Administrador',
        lastName: 'Del Sistema',
        role: 'admin',
        company: defaultCompany._id
      });

      await adminUser.save();
      console.log('✅ Usuario admin creado:');
      console.log('   Email: admin@securiti.com');
      console.log('   Password: admin123');
    } else {
      console.log('✅ Usuario admin ya existe');
    }

    // Crear usuario de seguridad por defecto
    const securityExists = await User.findOne({ role: 'security' });
    
    if (!securityExists) {
      const securityUser = new User({
        email: 'security@securiti.com',
        password: 'security123',
        firstName: 'Personal',
        lastName: 'de Seguridad',
        role: 'security',
        company: defaultCompany._id
      });

      await securityUser.save();
      console.log('✅ Usuario security creado:');
      console.log('   Email: security@securiti.com');
      console.log('   Password: security123');
    } else {
      console.log('✅ Usuario security ya existe');
    }

    // Crear usuario de recepción por defecto
    const receptionExists = await User.findOne({ role: 'reception' });
    
    if (!receptionExists) {
      const receptionUser = new User({
        email: 'reception@securiti.com',
        password: 'reception123',
        firstName: 'Personal',
        lastName: 'de Recepción',
        role: 'reception',
        company: defaultCompany._id
      });

      await receptionUser.save();
      console.log('✅ Usuario reception creado:');
      console.log('   Email: reception@securiti.com');
      console.log('   Password: reception123');
    } else {
      console.log('✅ Usuario reception ya existe');
    }

    // Crear usuario host por defecto
    const hostExists = await User.findOne({ role: 'host' });
    
    if (!hostExists) {
      const hostUser = new User({
        email: 'host@securiti.com',
        password: 'host123',
        firstName: 'Juan',
        lastName: 'Pérez',
        role: 'host',
        company: defaultCompany._id,
        isVisibleInAutoRegister: true
      });

      await hostUser.save();
      console.log('✅ Usuario host creado:');
      console.log('   Email: host@securiti.com');
      console.log('   Password: host123');
    } else {
      console.log('✅ Usuario host ya existe');
    }

    console.log('\n🎉 Base de datos inicializada correctamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  }
};

initDatabase();