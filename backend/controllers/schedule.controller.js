const Schedule = require("../models/schedule");

module.exports = {
  /**
   * Crée un nouvel horaire.
   * On attend dans req.body un objet au format :
   * {
   *   schedule: {
   *     <clé>: [date, userId, statusId],
   *     <clé2>: [date, userId, statusId],
   *     ...
   *   }
   * }
   */
  setSchedule: async (req, res) => {},

  /**
   * Récupère tous les horaires.
   */
  getSchedule: async (req, res) => {},

  /**
   * Met à jour un horaire existant.
   * L'identifiant du document à mettre à jour est passé en paramètre (req.params.id).
   * On attend dans req.body un objet contenant le champ 'schedule' au même format que pour la création.
   */
  putSchedule: async (req, res) => {},

  /**
   * Supprime un horaire existant.
   * L'identifiant du document à supprimer est passé en paramètre (req.params.id).
   */
  delSchedule: async (req, res) => {},
};
