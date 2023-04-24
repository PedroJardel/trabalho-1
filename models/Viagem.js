import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Viagem = sequelize.define('Viagem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    destino: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    transporte: {
        type: DataTypes.STRING(40),
        allowNull: false,
        isIn: { 
            args: [["terrestre", "maritimo", "aereo"]],
            msg: "O Transporte só pode ser Terrestre, Marítimo ou Aéreo"
        }
    },
    preco: {
        type: DataTypes.REAL,
        allowNull: false
    },
    duracao: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Viagens"
});