// /api/projects.js — Vercel Serverless Function
// Stores and retrieves project data using Vercel Blob or filesystem fallback
// Uses /tmp for Vercel serverless (ephemeral but works within a deployment)
// For production persistence, swap to Vercel KV, Upstash Redis, or a database

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = '/tmp/enterrank-projects';

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function getProjectPath(id) {
  return join(DATA_DIR, `${id}.json`);
}

function loadProject(id) {
  const path = getProjectPath(id);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function saveProject(project) {
  ensureDir();
  const path = getProjectPath(project.id);
  writeFileSync(path, JSON.stringify(project), 'utf-8');
}

function listProjects() {
  ensureDir();
  const { readdirSync } = require('fs');
  const files = readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  return files.map(f => {
    try {
      const data = JSON.parse(readFileSync(join(DATA_DIR, f), 'utf-8'));
      return {
        id: data.id,
        brand: data.brand,
        industry: data.industry,
        website: data.website,
        region: data.region,
        topics: data.topics,
        competitors: data.competitors,
        auditCount: (data.history || []).length,
        lastAudit: data.lastAudit || null,
        createdAt: data.createdAt || null,
        lastScore: data.lastScore || null,
      };
    } catch (e) { return null; }
  }).filter(Boolean);
}

function deleteProject(id) {
  const path = getProjectPath(id);
  if (existsSync(path)) {
    const { unlinkSync } = require('fs');
    unlinkSync(path);
    return true;
  }
  return false;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // GET /api/projects — list all projects
    if (req.method === 'GET') {
      const id = req.query.id;
      if (id) {
        const project = loadProject(id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        return res.status(200).json(project);
      }
      return res.status(200).json({ projects: listProjects() });
    }

    // POST /api/projects — create new project
    if (req.method === 'POST') {
      const { brand, industry, website, region, topics, competitors } = req.body;
      if (!brand) return res.status(400).json({ error: 'Brand name is required' });

      const id = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '-' + Date.now().toString(36);
      const project = {
        id,
        brand,
        industry: industry || '',
        website: website || '',
        region: region || '',
        topics: topics || [],
        competitors: competitors || [],
        history: [],
        lastAudit: null,
        lastScore: null,
        createdAt: new Date().toISOString(),
      };
      saveProject(project);
      return res.status(201).json(project);
    }

    // PUT /api/projects — update project (add audit entry or update details)
    if (req.method === 'PUT') {
      const { id, auditEntry, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'Project ID is required' });

      let project = loadProject(id);
      if (!project) return res.status(404).json({ error: 'Project not found' });

      // If an audit entry is being added
      if (auditEntry) {
        if (!project.history) project.history = [];
        project.history.push({
          ...auditEntry,
          timestamp: new Date().toISOString(),
        });
        project.lastAudit = new Date().toISOString();
        project.lastScore = auditEntry.overall || null;
      }

      // Update other fields if provided
      if (updates.brand) project.brand = updates.brand;
      if (updates.industry) project.industry = updates.industry;
      if (updates.website) project.website = updates.website;
      if (updates.region) project.region = updates.region;
      if (updates.topics) project.topics = updates.topics;
      if (updates.competitors) project.competitors = updates.competitors;

      saveProject(project);
      return res.status(200).json(project);
    }

    // DELETE /api/projects?id=xxx
    if (req.method === 'DELETE') {
      const id = req.query.id || req.body?.id;
      if (!id) return res.status(400).json({ error: 'Project ID is required' });
      const deleted = deleteProject(id);
      if (!deleted) return res.status(404).json({ error: 'Project not found' });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Projects API error:', error);
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
