import { getClientesCollection } from "../models/cliente.model.js";
import { createClienteDto } from "../dtos/cliente.dto.js";
import { ObjectId } from "mongodb";

export const createCliente = async (req, res) => {
  try {
    const collection = await getClientesCollection();
    const result = await collection.insertOne(req.body);
    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getClientes = async (req, res) => {
  try {
    const collection = await getClientesCollection();
    const clientes = await collection.find().toArray();
    res.status(200).json(clientes.map(createClienteDto));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const collection = await getClientesCollection();
    const cliente = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!cliente) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }
    res.status(200).json(createClienteDto(cliente));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const collection = await getClientesCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente actualizado" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const collection = await getClientesCollection();
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPuntos = async (req, res) => {
  try {
    const { cantidad } = req.body;
    const collection = await getClientesCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $push: { puntos: { fecha: new Date(), cantidad } } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }
    res.status(200).json({ message: "Puntos agregados exitosamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFidelityReport = async (req, res) => {
  try {
    const collection = await getClientesCollection();
    const clientes = await collection.find().toArray();
    const report = clientes.map((cliente) => {
      const puntosPorMes = Array(12).fill(0);
      if (cliente.puntos) {
        cliente.puntos.forEach((punto) => {
          const month = new Date(punto.fecha).getMonth();
          puntosPorMes[month] += punto.cantidad;
        });
      }
      return {
        ...createClienteDto(cliente),
        puntosPorMes,
      };
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
